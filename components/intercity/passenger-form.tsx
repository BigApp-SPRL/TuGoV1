"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { User } from "@/types/auth"
import { Icons } from "@/components/icons"

interface PassengerDetails {
  name: string
  email: string
  phone: string
}

interface PassengerFormProps {
  user: User | null
  bookingType: string
  passengerDetails: PassengerDetails
  isLoading: boolean
  totalPrice: number
  onBookingTypeChange: (value: string) => void
  onPassengerDetailsChange: (details: PassengerDetails) => void
  onSubmit: (e: React.FormEvent) => void
}

export function PassengerForm({
  user,
  bookingType,
  passengerDetails,
  isLoading,
  totalPrice,
  onBookingTypeChange,
  onPassengerDetailsChange,
  onSubmit
}: PassengerFormProps) {
  return (
    <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Who are you booking for?</Label>
            <RadioGroup
              value={bookingType}
              onValueChange={onBookingTypeChange}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self" id="self" />
                <Label htmlFor="self">Myself</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Someone else</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="passengerName">
                {bookingType === "self" ? "Your Name" : "Passenger's Name"}
              </Label>
              <Input
                id="passengerName"
                value={passengerDetails.name}
                onChange={(e) => onPassengerDetailsChange({
                  ...passengerDetails,
                  name: e.target.value
                })}
                required
              />
            </div>

            <div>
              <Label htmlFor="passengerEmail">
                {bookingType === "self" ? "Your Email" : "Passenger's Email"}
              </Label>
              <Input
                id="passengerEmail"
                type="email"
                value={passengerDetails.email}
                onChange={(e) => onPassengerDetailsChange({
                  ...passengerDetails,
                  email: e.target.value
                })}
                required
              />
            </div>

            <div>
              <Label htmlFor="passengerPhone">
                {bookingType === "self" ? "Your Phone" : "Passenger's Phone"}
              </Label>
              <Input
                id="passengerPhone"
                type="tel"
                value={passengerDetails.phone}
                onChange={(e) => onPassengerDetailsChange({
                  ...passengerDetails,
                  phone: e.target.value
                })}
                required
              />
            </div>
          </div>

          {bookingType === "other" && user && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Booking Contact Details</h3>
              <div>
                <Label htmlFor="bookerName">Your Name</Label>
                <Input
                  id="bookerName"
                  value={user.name}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="bookerEmail">Your Email</Label>
                <Input
                  id="bookerEmail"
                  value={user.email}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processing..." : `Pay ${totalPrice.toLocaleString()} FCFA`}
        </Button>
      </form>
    </Card>
  )
}