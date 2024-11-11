"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Bus, 
  Calendar,
  Clock, 
  MapPin,
  Save,
  User 
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

interface PassengerDetails {
  name: string
  email: string
  phone: string
  idNumber: string
}

export default function BookingDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    idNumber: "",
  })

  // Mock booking data - replace with actual API call
  const booking = {
    id,
    from: "Yaoundé",
    to: "Douala",
    date: "Jan 20, 2024",
    time: "08:00",
    company: "TuGo Express",
    status: "confirmed",
    seats: 1,
    price: 5000,
    bookingRef: "TG-2024-001",
  }

  const handleSave = () => {
    // Save passenger details
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground">
            You need to be signed in to view booking details.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Booking Details</h1>
            <p className="text-muted-foreground">Reference: {booking.bookingRef}</p>
          </div>
          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
            {booking.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Trip Information</h2>
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <Bus className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{booking.company}</p>
                <p className="text-sm text-muted-foreground">Transport Company</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">
                  {booking.from} → {booking.to}
                </p>
                <p className="text-sm text-muted-foreground">Route</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{booking.date}</p>
                <p className="text-sm text-muted-foreground">Travel Date</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{booking.time}</p>
                <p className="text-sm text-muted-foreground">Departure Time</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Passenger Details</h2>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                "Edit Details"
              )}
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={passengerDetails.name}
                  onChange={(e) => setPassengerDetails(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={passengerDetails.email}
                  onChange={(e) => setPassengerDetails(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={passengerDetails.phone}
                  onChange={(e) => setPassengerDetails(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value={passengerDetails.idNumber}
                  onChange={(e) => setPassengerDetails(prev => ({
                    ...prev,
                    idNumber: e.target.value
                  }))}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span>{booking.price.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Seats</span>
              <span>{booking.seats}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>{(booking.price * booking.seats).toLocaleString()} FCFA</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}