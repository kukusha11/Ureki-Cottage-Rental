import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Availability = () => {
  const months = ["June", "July", "August"];
  
  const availability = {
    June: { available: 7, booked: 0 },
    July: { available: 5, booked: 2 },
    August: { available: 3, booked: 4 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Availability</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Check cottage availability for summer 2025
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {months.map((month) => (
                <Card key={month}>
                  <CardHeader>
                    <CardTitle>{month} 2025</CardTitle>
                    <CardDescription>Cottage availability status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="text-green-600" size={20} />
                          <span className="font-medium">Available</span>
                        </div>
                        <span className="text-2xl font-bold text-green-600">
                          {availability[month as keyof typeof availability].available}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <XCircle className="text-red-600" size={20} />
                          <span className="font-medium">Booked</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          {availability[month as keyof typeof availability].booked}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact us to check specific dates and reserve your cottage. 
                    We recommend booking early for July and August as these months fill up quickly!
                  </p>
                  <Link to="/contact">
                    <Button size="lg">Contact Us to Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 bg-sand/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Booking Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Season:</strong> Our cottages are available 
                  from June 1st through August 31st each year.
                </p>
                <p>
                  <strong className="text-foreground">Minimum Stay:</strong> We require a minimum 
                  stay of 3 nights. Weekly bookings receive a special discount!
                </p>
                <p>
                  <strong className="text-foreground">Check-in/Check-out:</strong> Check-in is at 
                  2:00 PM and check-out is at 11:00 AM.
                </p>
                <p>
                  <strong className="text-foreground">Deposit:</strong> A 30% deposit is required 
                  to secure your booking, with the balance due upon arrival.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Availability;
