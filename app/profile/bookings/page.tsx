"use client"

import { useAuth } from "@/components/auth-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bus, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// Mock bookings data - replace with actual API call
const bookings = [
  {
    id: 1,
    from: "Yaoundé",
    to: "Douala",
    date: "Jan 20, 2024",
    time: "08:00",
    company: "TuGo Express",
    status: "confirmed",
    price: 5000,
    bookingRef: "TG-2024-001",
  },
  {
    id: 2,
    from: "Yaoundé",
    to: "Bamenda",
    date: "Jan 25, 2024",
    time: "07:00",
    company: "Comfort Line",
    status: "pending",
    price: 8000,
    bookingRef: "CL-2024-002",
  },
]

export default function BookingsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground">
            You need to be signed in to view your bookings.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Button asChild>
          <Link href="/intercity">Book New Trip</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{booking.company}</span>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                  >
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {booking.from} → {booking.to}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {booking.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {booking.time}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Booking Reference: </span>
                  <span className="font-medium">{booking.bookingRef}</span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {booking.price.toLocaleString()} FCFA
                  </div>
                  <div className="text-sm text-muted-foreground">per seat</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/profile/bookings/${booking.id}`}>
                      View Details
                    </Link>
                  </Button>
                  {booking.status === "pending" && (
                    <Button variant="destructive">Cancel</Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}