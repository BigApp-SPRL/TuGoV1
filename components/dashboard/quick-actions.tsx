"use client"

import { Button } from "@/components/ui/button"
import { Bus, Car, MapPin, User } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Book Intercity Trip",
    description: "Find and book intercity bus tickets",
    icon: Bus,
    href: "/intercity",
  },
  {
    title: "Request Urban Ride",
    description: "Book a ride within the city",
    icon: Car,
    href: "/urban",
  },
  {
    title: "Rent a Car",
    description: "Browse available vehicles for rent",
    icon: MapPin,
    href: "/rental",
  },
  {
    title: "Update Profile",
    description: "Manage your account settings",
    icon: User,
    href: "/profile",
  },
]

export function QuickActions() {
  return (
    <div className="grid gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto flex items-start gap-4 p-4"
            asChild
          >
            <Link href={action.href}>
              <Icon className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </Link>
          </Button>
        )
      })}
    </div>
  )
}