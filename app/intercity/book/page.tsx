"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useBooking } from "@/hooks/use-booking"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { TripSummary } from "@/components/intercity/trip-summary"
import { PassengerForm } from "@/components/intercity/passenger-form"

interface PassengerDetails {
  name: string
  email: string
  phone: string
}

export default function IntercityBookingPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { 
    selectedTrip,
    setSelectedTrip,
    setPassengerInfo 
  } = useBooking()

  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingType, setBookingType] = useState("self")
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    name: "",
    email: "",
    phone: ""
  })

  const seatsParam = searchParams.get('seats')
  const seats = seatsParam ? Math.max(1, parseInt(seatsParam, 10) || 1) : 1
  const isRoundTrip = searchParams.get('roundTrip') === 'true'
  const tripId = searchParams.get('trip')

  useEffect(() => {
    if (!tripId) {
      router.push('/intercity')
      return
    }

    // In a real app, fetch trip details from API
    const mockTrip = {
      id: tripId,
      from: "Yaoundé",
      to: "Douala",
      date: "2024-01-20",
      departureTime: "08:00",
      price: 5000,
      company: "TuGo Express",
      busType: "Luxury Coach",
      availableSeats: 24,
      amenities: ["AC", "WiFi", "USB Charging", "Snacks"],
      comfort: "premium"
    }
    setSelectedTrip(mockTrip)
  }, [tripId, router, setSelectedTrip])

  useEffect(() => {
    if (bookingType === "self" && user) {
      setPassengerDetails({
        name: user.name,
        email: user.email,
        phone: user.phone || ""
      })
    } else if (bookingType === "other") {
      setPassengerDetails({
        name: "",
        email: "",
        phone: ""
      })
    }
  }, [bookingType, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Save passenger info to booking store
      setPassengerInfo({
        type: bookingType,
        details: passengerDetails,
        seats,
        isRoundTrip
      })
      
      // Redirect to payment page
      router.push('/intercity/book/payment')
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (!selectedTrip) {
    return <div className="p-8">Loading...</div>
  }

  const totalPrice = selectedTrip.price * seats

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Search Results
      </Button>

      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <TripSummary
          trip={selectedTrip}
          seats={seats}
          isRoundTrip={isRoundTrip}
        />

        <PassengerForm
          user={user}
          bookingType={bookingType}
          passengerDetails={passengerDetails}
          isLoading={isProcessing}
          totalPrice={totalPrice}
          onBookingTypeChange={setBookingType}
          onPassengerDetailsChange={setPassengerDetails}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}