"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/loading-button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function UrbanPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  const router = useRouter()
  const { t } = useLanguage()
  const { toast } = useToast()
  const { user } = useAuth()

  const handleRideNow = async () => {
    if (!pickup || !dropoff) {
      toast({
        title: t("error"),
        description: t("pleaseEnterLocations"),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!user) {
        router.push(`/auth/signin?returnUrl=${encodeURIComponent('/urban/book')}`)
        return
      }

      router.push(`/urban/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`)
    } catch (error) {
      toast({
        title: t("error"),
        description: t("somethingWentWrong"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleScheduleRide = async () => {
    if (!pickup || !dropoff || !scheduleDate || !scheduleTime) {
      toast({
        title: t("error"),
        description: t("pleaseEnterAllDetails"),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!user) {
        router.push(`/auth/signin?returnUrl=${encodeURIComponent('/urban/schedule')}`)
        return
      }

      router.push(`/urban/schedule?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${encodeURIComponent(scheduleDate)}&time=${encodeURIComponent(scheduleTime)}`)
    } catch (error) {
      toast({
        title: t("error"),
        description: t("somethingWentWrong"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-lg mx-auto py-8 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">{t("urbanTransport")}</h1>

        <Tabs defaultValue="now" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="now">{t("rideNow")}</TabsTrigger>
            <TabsTrigger value="schedule">{t("scheduleRide")}</TabsTrigger>
          </TabsList>

          <TabsContent value="now" className="space-y-4">
            <div className="space-y-4">
              <Input
                placeholder={t("pickupLocation")}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
              <Input
                placeholder={t("dropoffLocation")}
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>

            <LoadingButton 
              className="w-full"
              onClick={handleRideNow}
              isLoading={isLoading}
            >
              <Icons.car className="mr-2 h-4 w-4" />
              {t("findDriver")}
            </LoadingButton>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-4">
              <Input
                placeholder={t("pickupLocation")}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
              <Input
                placeholder={t("dropoffLocation")}
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
              <Input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
              <Input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>

            <LoadingButton 
              className="w-full"
              onClick={handleScheduleRide}
              isLoading={isLoading}
            >
              <Icons.calendar className="mr-2 h-4 w-4" />
              {t("scheduleRide")}
            </LoadingButton>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}