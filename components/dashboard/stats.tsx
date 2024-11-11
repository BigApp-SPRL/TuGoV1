"use client"

import { Card } from "@/components/ui/card"
import { Activity, Bus, Clock, MapPin } from "lucide-react"

const stats = [
  {
    title: "Active Bookings",
    value: "3",
    change: "+2",
    icon: Activity,
  },
  {
    title: "Total Trips",
    value: "12",
    change: "+5",
    icon: Bus,
  },
  {
    title: "Hours Traveled",
    value: "48",
    change: "+12",
    icon: Clock,
  },
  {
    title: "Cities Visited",
    value: "5",
    change: "+2",
    icon: MapPin,
  },
]

export function DashboardStats() {
  return stats.map((stat) => {
    const Icon = stat.icon
    return (
      <Card key={stat.title} className="p-6">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            {stat.title}
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{stat.value}</span>
          <span className="text-sm text-green-600">{stat.change}</span>
        </div>
      </Card>
    )
  })
}