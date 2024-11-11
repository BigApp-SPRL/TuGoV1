"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bus, Clock, Users } from "lucide-react"
import { Trip, ComfortLevel } from "@/types/intercity"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

interface TripCardProps {
  trip: Trip
  passengers: string
  isRoundTrip: boolean
  comfortLevels: Record<string, ComfortLevel>
}

export function TripCard({ trip, passengers, isRoundTrip, comfortLevels }: TripCardProps) {
  const router = useRouter()
  const { user, setPendingBooking } = useAuth()
  const { toast } = useToast()

  // Convert passengers to number and ensure it's valid
  const numPassengers = Math.max(1, parseInt(passengers, 10) || 1)
  const totalPrice = trip.price * numPassengers

  const handleBooking = () => {
    const bookingUrl = `/intercity/book?trip=${trip.id}&seats=${numPassengers}&roundTrip=${isRoundTrip}`
    
    if (!user) {
      setPendingBooking({
        tripId: trip.id,
        selectedSeats: numPassengers,
        isRoundTrip,
        returnUrl: bookingUrl
      })
      
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with your booking.",
      })
      
      router.push(`/auth/signin?returnUrl=${encodeURIComponent(bookingUrl)}`)
      return
    }

    router.push(bookingUrl)
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            <span className="font-semibold">{trip.company}</span>
            <Badge variant="secondary">{trip.busType}</Badge>
            <Badge variant="outline">{comfortLevels[trip.comfort].label}</Badge>
          </div>
          <div className="text-lg font-semibold">
            {trip.from} → {trip.to}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {trip.departureTime}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {trip.availableSeats} seats left
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {trip.amenities.map((amenity, index) => (
              <Badge key={index} variant="outline">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div>
            <div className="text-sm text-muted-foreground">Price per seat</div>
            <div className="text-xl font-bold">
              {trip.price.toLocaleString()} FCFA
            </div>
          </div>
          <div className="text-2xl font-bold">
            {totalPrice.toLocaleString()} FCFA
            <div className="text-sm text-muted-foreground">
              {numPassengers} {numPassengers === 1 ? 'seat' : 'seats'}
              {isRoundTrip && ' (one way)'}
            </div>
          </div>
          <Button onClick={handleBooking}>
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  )
}