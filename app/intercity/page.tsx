"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TripCard } from "@/components/intercity/trip-card"
import { SearchFilters } from "@/components/intercity/search-filters"
import { mockTrips, popularRoutes, comfortLevels } from "@/lib/intercity-data"
import type { Trip } from "@/types/intercity"

export default function IntercityPage() {
  const { t } = useLanguage()
  const [date, setDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchResults, setSearchResults] = useState<Trip[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedComfort, setSelectedComfort] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [departureTime, setDepartureTime] = useState("any")

  const handleSearch = () => {
    if (!from || !to) {
      return
    }
    
    setSearchPerformed(true)
    let results = mockTrips.filter(trip => {
      const matchesFrom = trip.from.toLowerCase() === from.toLowerCase()
      const matchesTo = trip.to.toLowerCase() === to.toLowerCase()
      const matchesDate = !date || trip.date === format(date, "yyyy-MM-dd")
      return matchesFrom && matchesTo && matchesDate
    })

    // Sort by price
    results = results.sort((a, b) => a.price - b.price)
    setSearchResults(results)
    setShowFilters(true)
  }

  const handleApplyFilters = () => {
    let results = searchResults.filter(trip => {
      const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1]
      const matchesComfort = selectedComfort.length === 0 || selectedComfort.includes(trip.comfort)
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => 
          trip.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
        )
      const matchesDeparture = departureTime === "any" || 
        (departureTime === "morning" && parseInt(trip.departureTime) < 12) ||
        (departureTime === "afternoon" && parseInt(trip.departureTime) >= 12)

      return matchesPrice && matchesComfort && matchesAmenities && matchesDeparture
    })

    setSearchResults(results)
  }

  const getSuggestedRoutes = () => {
    if (!from && !to) return popularRoutes
    
    return popularRoutes.filter(route => {
      const matchesFrom = !from || route.from.toLowerCase().includes(from.toLowerCase())
      const matchesTo = !to || route.to.toLowerCase().includes(to.toLowerCase())
      return matchesFrom || matchesTo
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Intercity Travel</h1>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input 
              id="from" 
              placeholder="Departure city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input 
              id="to" 
              placeholder="Destination city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Passengers</Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-full">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isRoundTrip}
                onCheckedChange={setIsRoundTrip}
              />
              <Label>Round Trip</Label>
            </div>
          </div>

          {isRoundTrip && (
            <div className="space-y-2">
              <Label>Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                    disabled={(date) => !date || (!!date && date < new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
          
          <div className="flex items-end gap-2 col-span-full">
            <Button 
              className="flex-1" 
              size="lg" 
              onClick={handleSearch}
              disabled={!from || !to}
            >
              <Search className="mr-2 h-4 w-4" />
              Search Trips
            </Button>
          </div>
        </div>
      </Card>

      {searchPerformed && (
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">Available Trips</h2>
                  <p className="text-muted-foreground">
                    {searchResults.length} {searchResults.length === 1 ? 'trip' : 'trips'} found
                  </p>
                </div>
                {showFilters && (
                  <SearchFilters
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedComfort={selectedComfort}
                    setSelectedComfort={setSelectedComfort}
                    selectedAmenities={selectedAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                    departureTime={departureTime}
                    setDepartureTime={setDepartureTime}
                    onApplyFilters={handleApplyFilters}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {searchResults.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    passengers={passengers}
                    isRoundTrip={isRoundTrip}
                    comfortLevels={comfortLevels}
                  />
                ))}
              </div>
            </>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No trips found</AlertTitle>
              <AlertDescription className="space-y-4">
                <p>
                  We couldn't find any trips from <strong>{from}</strong> to <strong>{to}</strong>
                  {date ? ` on ${format(date, "MMMM d, yyyy")}` : ""} for {passengers} {parseInt(passengers) === 1 ? 'passenger' : 'passengers'}.
                </p>
                <div>
                  <p className="font-medium mb-2">You might want to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Try different dates</li>
                    <li>Check nearby cities</li>
                    <li>Consider alternative routes</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="font-medium mb-2">Popular routes you might be interested in:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {getSuggestedRoutes().slice(0, 3).map((route, index) => (
                      <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          setFrom(route.from)
                          setTo(route.to)
                          handleSearch()
                        }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{route.from} → {route.to}</h3>
                            <p className="text-sm text-muted-foreground">From {route.price} FCFA</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {!searchPerformed && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setFrom(route.from)
                  setTo(route.to)
                  handleSearch()
                }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{route.from} → {route.to}</h3>
                    <p className="text-sm text-muted-foreground">Multiple departures daily</p>
                  </div>
                  <p className="font-semibold">From {route.price} FCFA</p>
                </div>
                <Button variant="outline" className="w-full">
                  View Schedule
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}