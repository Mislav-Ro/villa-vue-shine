import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, CalendarDays } from "lucide-react";
import { addDays, format, differenceInDays } from "date-fns";
import ICAL from "ical.js";
import { useCurrentProperty, getICalSources } from "@/utils/propertyUtils";


const ContactForm = () => {
  const { toast } = useToast();
  const currentProperty = useCurrentProperty();
  const icalSources = getICalSources(currentProperty);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    message: ""
  });

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  // Fetch and parse iCal data
  useEffect(() => {
    const fetchICalData = async () => {
      try {
        const blockedDatesSet = new Set<string>();
        for (const source of icalSources) {
          try {
            console.log(`Fetching ${source.name} calendar...`);

            // Try multiple CORS proxies
            const proxies = [`https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`, `https://cors-anywhere.herokuapp.com/${source.url}`, source.url // Direct attempt (might work in some cases)
            ];
            let icalData = '';
            let success = false;
            for (const proxyUrl of proxies) {
              try {
                const response = await fetch(proxyUrl, {
                  headers: source.url.includes('booking.com') ? {} : {
                    'X-Requested-With': 'XMLHttpRequest'
                  }
                });
                if (response.ok) {
                  icalData = await response.text();
                  console.log(`Successfully fetched ${source.name} data via proxy`);
                  success = true;
                  break;
                }
              } catch (proxyError) {
                console.log(`Proxy ${proxyUrl} failed, trying next...`);
              }
            }
            if (!success) {
              console.warn(`Failed to fetch ${source.name} calendar from all proxies`);
              continue;
            }

            // Parse iCal data
            if (icalData && icalData.includes('BEGIN:VCALENDAR')) {
              const jcalData = ICAL.parse(icalData);
              const comp = new ICAL.Component(jcalData);
              const vevents = comp.getAllSubcomponents('vevent');
              console.log(`Found ${vevents.length} events in ${source.name} calendar`);
              vevents.forEach(vevent => {
                const event = new ICAL.Event(vevent);
                const startDate = event.startDate.toJSDate();
                const endDate = event.endDate.toJSDate();
                console.log(`${source.name} booking: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

                // Add all dates from start to end (excluding end date)
                let currentDate = new Date(startDate);
                while (currentDate < endDate) {
                  const dateString = currentDate.toISOString().split('T')[0];
                  blockedDatesSet.add(dateString);
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              });
            }
          } catch (error) {
            console.error(`Error processing ${source.name} calendar:`, error);
          }
        }

        // Convert Set to Array of Date objects
        const blockedDatesArray = Array.from(blockedDatesSet).map(dateString => new Date(dateString));
        console.log(`Total blocked dates: ${blockedDatesArray.length}`, blockedDatesArray.map(d => d.toISOString().split('T')[0]));
        setBookedDates(blockedDatesArray);
      } catch (error) {
        console.error('Error processing iCal data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchICalData();
  }, [currentProperty]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return bookedDates.some(bookedDate => date.toDateString() === bookedDate.toDateString());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    if (!checkIn || checkIn && checkOut) {
      setCheckIn(date);
      setCheckOut(undefined);
      setFormData(prev => ({ ...prev, checkIn: date.toISOString().split('T')[0] }));
    } else if (checkIn && !checkOut && date > checkIn) {
      setCheckOut(date);
      setFormData(prev => ({ ...prev, checkOut: date.toISOString().split('T')[0] }));
    } else {
      setCheckIn(date);
      setCheckOut(undefined);
      setFormData(prev => ({ ...prev, checkIn: date.toISOString().split('T')[0], checkOut: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mvgbqqgk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-gradient-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Availability & Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your preferred dates and send us a message. We're here to help make your villa experience perfect.
          </p>
          {isLoading && <p className="text-sm text-muted-foreground mt-2">
              Loading availability from Booking.com and Airbnb...
            </p>}
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Calendar and Contact Form */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-villa-ocean">
                  <CalendarDays className="w-5 h-5" />
                  Select Your Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={checkIn} onSelect={handleDateSelect} disabled={isDateDisabled} className="w-full pointer-events-auto" modifiers={{
                booked: bookedDates,
                checkIn: checkIn ? [checkIn] : [],
                checkOut: checkOut ? [checkOut] : [],
                range: checkIn && checkOut ? Array.from({
                  length: nights
                }, (_, i) => addDays(checkIn, i + 1)).slice(0, -1) : []
              }} modifiersStyles={{
                booked: {
                  backgroundColor: 'hsl(var(--destructive))',
                  color: 'hsl(var(--destructive-foreground))',
                  opacity: 0.5
                },
                checkIn: {
                  backgroundColor: 'hsl(var(--villa-ocean))',
                  color: 'white',
                  fontWeight: 'bold'
                },
                checkOut: {
                  backgroundColor: 'hsl(var(--villa-ocean))',
                  color: 'white',
                  fontWeight: 'bold'
                },
                range: {
                  backgroundColor: 'hsl(var(--villa-ocean-light))',
                  color: 'white',
                  opacity: 0.3
                }
              }} />
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-villa-ocean">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        placeholder="2"
                        min="1"
                        max="8"
                        value={formData.guests}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your stay preferences, special requests, or any questions you have..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-villa-ocean hover:bg-villa-ocean-light text-white shadow-villa"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information - Horizontal Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone (WhatsApp)</h3>
                    <p className="text-muted-foreground">+385 91 4177 971</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">mislavrogulj@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-villa-ocean rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Uvala Stivasnica, 100e, Croatia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;