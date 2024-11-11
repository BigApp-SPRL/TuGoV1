import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bus, Car, MapPin } from "lucide-react"
import Link from "next/link"
import { IntelligentSearch } from "@/components/intelligent-search"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Your Complete Mobility Solution
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Travel seamlessly across Cameroon with our all-in-one platform for intercity travel, urban transport, and car rentals.
          </p>
          
          {/* Intelligent Search Bar */}
          <div className="mb-8">
            <IntelligentSearch />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <Bus className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Intercity Travel</h3>
              <p className="text-muted-foreground mb-4">
                Book bus tickets and carpooling options for travel between cities.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link href="/intercity">Book Now</Link>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <Car className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Urban Transport</h3>
              <p className="text-muted-foreground mb-4">
                Request rides within the city with our reliable drivers.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link href="/urban">Request Ride</Link>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <MapPin className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Car Rental</h3>
              <p className="text-muted-foreground mb-4">
                Rent vehicles with or without chauffeurs for your convenience.
              </p>
              <Button variant="outline" className="mt-auto" asChild>
                <Link href="/rental">Rent Now</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TuGo?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service for your peace of mind"
              },
              {
                title: "Secure Payments",
                description: "Multiple secure payment options including mobile money"
              },
              {
                title: "Real-time Tracking",
                description: "Track your rides and rentals in real-time"
              },
              {
                title: "Verified Drivers",
                description: "All our drivers and vehicles are thoroughly vetted"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}