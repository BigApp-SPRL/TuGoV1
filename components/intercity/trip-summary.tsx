"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trip } from "@/types/intercity"

interface TripSummaryProps {
  trip: Trip
  seats: number
  isRoundTrip: boolean
}

export function TripSummary({ trip, seats, isRoundTrip }: TripSummaryProps) {
  const totalPrice = trip.price * seats

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
      <div className="space-y-4">
        <div>
          <Label>Route</Label>
          <p className="text-lg font-medium">{trip.from} → {trip.to}</p>
        </div>
        <div>
          <Label>Date & Time</Label>
          <p className="text-lg font-medium">{trip.date} at {trip.departureTime}</p>
        </div>
        <div>
          <Label>Number of Seats</Label>
          <p className="text-lg font-medium">{seats} {seats === 1 ? 'seat' : 'seats'}</p>
        </div>
        <div>
          <Label>Price per Seat</Label>
          <p className="text-lg font-medium">{trip.price.toLocaleString()} FCFA</p>
        </div>
        <div>
          <Label>Trip Type</Label>
          <p className="text-lg font-medium">{isRoundTrip ? 'Round Trip' : 'One Way'}</p>
        </div>
        <div className="pt-4 border-t">
          <Label>Total Price</Label>
          <p className="text-2xl font-bold">{totalPrice.toLocaleString()} FCFA</p>
          {isRoundTrip && (
            <p className="text-sm text-muted-foreground">Price shown is for one way</p>
          )}
        </div>
      </div>
    </Card>
  )
}