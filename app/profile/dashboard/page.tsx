"use client"

import { useAuth } from "@/components/auth-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Activity, 
  Bus, 
  Calendar,
  Car, 
  Clock, 
  MapPin, 
  Star,
  TrendingUp,
  User
} from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingTrips } from "@/components/dashboard/upcoming-trips"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground">
            You need to be signed in to view your dashboard.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your travel plans</p>
        </div>
        <Button asChild>
          <Link href="/intercity">Book New Trip</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upcoming Trips</h2>
              <Button variant="outline" asChild>
                <Link href="/profile/bookings">View All</Link>
              </Button>
            </div>
            <UpcomingTrips />
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <Button variant="ghost" size="sm">
                Clear All
              </Button>
            </div>
            <RecentActivities />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <QuickActions />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Travel Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-primary" />
                  <span>Total Trips</span>
                </div>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Cities Visited</span>
                </div>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Loyalty Points</span>
                </div>
                <span className="font-semibold">250</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Total Distance</span>
                </div>
                <span className="font-semibold">1,250 km</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}