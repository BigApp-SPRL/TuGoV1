"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingButton } from "@/components/ui/loading-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Car, Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useBooking } from "@/hooks/use-booking"
import { useToast } from "@/components/ui/use-toast"

export default function RentalBookingPage() {
  // Previous state declarations remain the same...

  const router = useRouter()
  const { toast } = useToast()
  const { rentCar, isLoading } = useBooking()

  const handleSubmit = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Please select rental dates.",
        variant: "destructive",
      })
      return
    }

    try {
      await rentCar({
        car,
        dateRange,
        withDriver,
        total
      })
      toast({
        title: "Success",
        description: "Your car rental has been booked successfully.",
      })
      router.push("/profile")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book rental. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Rest of your component code...

  return (
    // Previous JSX remains the same until the payment button
    <LoadingButton 
      className="w-full"
      onClick={handleSubmit}
      loading={isLoading}
    >
      Proceed to Payment
    </LoadingButton>
  )
}