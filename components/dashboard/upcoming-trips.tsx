"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bus, Clock, MapPin } from "lucide-react"
import Link from "next/link"

const upcomingTrips = [
  {
    id: 1,
    from: "Yaoundé",
    to: "Douala",
    date: "Jan 20, 2024",
    time: "08:00",
    company: "TuGo Express",
    status: "confirmed",
  },
  {
    id: 2,
    from: "Yaoundé",
    to: "Bamenda",
    date: "Jan 25, 2024",
    time: "07:00",
    company: "Comfort Line",
    status: "pending",
  },
]

export function UpcomingTrips() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {upcomingTrips.map((trip) => (
          <div
            key={trip.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bus className="h-5 w-5 text-primary" />
                <span className="font-semibold">{trip.company}</span>
                <Badge
                  variant={trip.status === "confirmed" ? "default" : "secondary"}
                >
                  {trip.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {trip.from} → {trip.to}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {trip.date} at {trip.time}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/profile/bookings/${trip.id}`}>View Details</Link>
              </Button>
              {trip.status === "pending" && (
                <Button variant="destructive">Cancel</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}