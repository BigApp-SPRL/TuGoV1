"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bus, Calendar, CreditCard } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "booking",
    title: "Booked trip to Douala",
    time: "2 hours ago",
    icon: Bus,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment confirmed",
    time: "2 hours ago",
    icon: CreditCard,
  },
  {
    id: 3,
    type: "schedule",
    title: "Scheduled trip to Bamenda",
    time: "Yesterday",
    icon: Calendar,
  },
]

export function RecentActivities() {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50"
            >
              <div className="rounded-full p-2 bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.title}</p>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}