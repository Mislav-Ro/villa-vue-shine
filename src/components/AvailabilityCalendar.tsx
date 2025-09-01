import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Users, Euro } from "lucide-react";
import { addDays, format, differenceInDays } from "date-fns";

const AvailabilityCalendar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  
  const pricePerNight = 450;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * pricePerNight;

  // Disable past dates and some random booked dates for demo
  const disabledDates = [
    new Date(2024, 2, 15),
    new Date(2024, 2, 16),
    new Date(2024, 2, 20),
    new Date(2024, 3, 5),
    new Date(2024, 3, 6),
    new Date(2024, 3, 7),
  ];

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return true;
    
    return disabledDates.some(disabledDate => 
      date.toDateString() === disabledDate.toDateString()
    );
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Check Availability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your preferred dates and see real-time availability for your perfect getaway.
          </p>
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
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  className="w-full pointer-events-auto"
                  modifiers={{
                    booked: disabledDates,
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </Button>
                      <span className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {guests}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="border-t pt-4 space-y-2">
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
                  </div>
                )}

                <Button 
                  className="w-full bg-villa-ocean hover:bg-villa-ocean-light text-white shadow-villa"
                  disabled={!checkIn || !checkOut}
                >
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
    </section>
  );
};

export default AvailabilityCalendar;