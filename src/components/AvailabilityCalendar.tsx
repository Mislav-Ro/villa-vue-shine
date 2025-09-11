import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Users, Euro } from "lucide-react";
import { addDays, format, differenceInDays } from "date-fns";
import ICAL from "ical.js";
import { useCurrentProperty, getICalSources } from "@/utils/propertyUtils";

const AvailabilityCalendar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentProperty = useCurrentProperty();
  const icalSources = getICalSources(currentProperty);

  const pricePerNight = 450;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * pricePerNight;

  // Fetch and parse iCal data
  useEffect(() => {
    const fetchICalData = async () => {
      try {
        const blockedDatesSet = new Set<string>();

        for (const source of icalSources) {
          try {
            console.log(`Fetching ${source.name} calendar for ${currentProperty}...`);

            // Try multiple CORS proxies
            const proxies = [
              `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`,
              `https://cors-anywhere.herokuapp.com/${source.url}`,
              source.url // Direct attempt (might work in some cases)
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
                  console.log(`Successfully fetched ${source.name} data for ${currentProperty} via proxy`);
                  success = true;
                  break;
                }
              } catch (proxyError) {
                console.log(`Proxy ${proxyUrl} failed, trying next...`);
              }
            }

            if (!success) {
              console.warn(`Failed to fetch ${source.name} calendar for ${currentProperty} from all proxies`);
              continue;
            }

            // Parse iCal data
            if (icalData && icalData.includes('BEGIN:VCALENDAR')) {
              const jcalData = ICAL.parse(icalData);
              const comp = new ICAL.Component(jcalData);
              const vevents = comp.getAllSubcomponents('vevent');
              console.log(`Found ${vevents.length} events in ${source.name} calendar for ${currentProperty}`);

              vevents.forEach((vevent) => {
                const event = new ICAL.Event(vevent);
                const startDate = event.startDate.toJSDate();
                const endDate = event.endDate.toJSDate();
                console.log(`${source.name} booking for ${currentProperty}: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

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
            console.error(`Error processing ${source.name} calendar for ${currentProperty}:`, error);
          }
        }

        // Convert Set to Array of Date objects
        const blockedDatesArray = Array.from(blockedDatesSet).map(dateString => new Date(dateString));
        console.log(`Total blocked dates for ${currentProperty}: ${blockedDatesArray.length}`, blockedDatesArray.map(d => d.toISOString().split('T')[0]));
        setBookedDates(blockedDatesArray);
      } catch (error) {
        console.error(`Error processing iCal data for ${currentProperty}:`, error);
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

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(undefined);
    } else if (checkIn && !checkOut && date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(undefined);
    }
  };

  return (
    <section className="bg-background py-[20px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Availability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your preferred dates and see real-time availability for your perfect getaway.
          </p>
          {isLoading && (
            <p className="text-sm text-muted-foreground mt-2">
              Loading availability from Booking.com and Airbnb...
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-villa-ocean">
                <CalendarDays className="w-5 h-5" />
                Select Your Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="w-full pointer-events-auto"
                modifiers={{
                  booked: bookedDates,
                  checkIn: checkIn ? [checkIn] : [],
                  checkOut: checkOut ? [checkOut] : [],
                  range: checkIn && checkOut ? 
                    Array.from({ length: nights }, (_, i) => addDays(checkIn, i + 1)).slice(0, -1) : []
                }}
                modifiersStyles={{
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
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityCalendar;