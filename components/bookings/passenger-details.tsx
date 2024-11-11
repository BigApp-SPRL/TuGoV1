"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface Passenger {
  name: string
  email: string
  phone: string
}

interface PassengerDetailsProps {
  booking: any // Type this properly in a real app
}

export function PassengerDetails({ booking }: PassengerDetailsProps) {
  const [passengers, setPassengers] = useState<Passenger[]>(
    booking.passengers.length > 0
      ? booking.passengers
      : Array(booking.seats).fill({
          name: "",
          email: "",
          phone: "",
        })
  )
  const [isEditing, setIsEditing] = useState(booking.passengers.length === 0)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Passenger details have been saved.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save passenger details.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers]
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value,
    }
    setPassengers(newPassengers)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Passenger Details</h3>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Details
            </Button>
          )}
        </div>

        {passengers.map((passenger, index) => (
          <div key={index} className="space-y-4 mb-6">
            <h4 className="font-medium">
              Passenger {index + 1} of {booking.seats}
            </h4>
            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={passenger.name}
                onChange={(e) => updatePassenger(index, "name", e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={passenger.email}
                onChange={(e) => updatePassenger(index, "email", e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={passenger.phone}
                onChange={(e) => updatePassenger(index, "phone", e.target.value)}
                disabled={!isEditing}
                required
              />
            </div>
          </div>
        ))}

        {isEditing && (
          <Button
            className="w-full mt-4"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save Details
          </Button>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Trip Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">From</div>
            <div className="font-medium">{booking.trip.from}</div>
          </div>
          <div>
            <div className="text-muted-foreground">To</div>
            <div className="font-medium">{booking.trip.to}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Date</div>
            <div className="font-medium">{booking.trip.date}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Time</div>
            <div className="font-medium">{booking.trip.time}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Seats</div>
            <div className="font-medium">{booking.seats}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Price</div>
            <div className="font-medium">
              {(booking.trip.price * booking.seats).toLocaleString()} FCFA
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}