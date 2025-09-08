import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Users, Euro } from "lucide-react";
import { addDays, format, differenceInDays } from "date-fns";
import ICAL from "ical.js";
const ICAL_SOURCES = [{
  name: 'Booking.com',
  url: 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f'
}, {
  name: 'Airbnb',
  url: 'https://www.airbnb.com/calendar/ical/33287681.ics?s=d62b44bb665593bb511faaf0f880fcd0'
}];
const AvailabilityCalendar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pricePerNight = 450;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * pricePerNight;

  // Fetch and parse iCal data
  useEffect(() => {
    const fetchICalData = async () => {
      try {
        const blockedDatesSet = new Set<string>();
        for (const source of ICAL_SOURCES) {
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
  }, []);
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
    } else if (checkIn && !checkOut && date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(undefined);
    }
  };
  return <section className="bg-background py-[20px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Availability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your preferred dates and see real-time availability for your perfect getaway.
          </p>
          {isLoading && <p className="text-sm text-muted-foreground mt-2">
              Loading availability from Booking.com and Airbnb...
            </p>}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calendar */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle className="text-villa-ocean">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span className="font-medium">
                      {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="font-medium">
                      {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Guests:</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setGuests(Math.max(1, guests - 1))}>
                        -
                      </Button>
                      <span className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {guests}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => setGuests(Math.min(8, guests + 1))}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {nights > 0 && <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>€{pricePerNight} × {nights} nights</span>
                      <span>€{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>€75</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>€{Math.round(totalPrice * 0.05)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="flex items-center gap-1 text-villa-ocean">
                        <Euro className="w-5 h-5" />
                        {totalPrice + 75 + Math.round(totalPrice * 0.05)}
                      </span>
                    </div>
                  </div>}

                <Button className="w-full bg-villa-ocean hover:bg-villa-ocean-light text-white shadow-villa" disabled={!checkIn || !checkOut}>
                  Reserve Now
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default AvailabilityCalendar;