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
import { Calendar as CalendarIcon, Car, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function RentalPage() {
  const { t } = useLanguage()
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Car Rental</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="p-6 h-fit">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <Label>Price Range</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>

                <div>
                  <Label>Vehicle Type</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Sedan", "SUV", "Van", "Luxury"].map((type) => (
                      <Badge key={type} variant="outline" className="cursor-pointer">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Features</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["AC", "Automatic", "GPS", "Bluetooth"].map((feature) => (
                      <Badge key={feature} variant="outline" className="cursor-pointer">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Pickup location" />
              </div>

              <div className="space-y-2">
                <Label>Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd")} -{" "}
                            {format(dateRange.to, "LLL dd")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd")
                        )
                      ) : (
                        <span>Pick dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range: any) => setDateRange(range)}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Search Cars
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Toyota Camry",
                type: "Sedan",
                price: "25000",
                features: ["AC", "Automatic"],
                image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=400&h=300"
              },
              {
                name: "Honda CR-V",
                type: "SUV",
                price: "35000",
                features: ["AC", "GPS", "Bluetooth"],
                image: "https://images.unsplash.com/photo-1568844293974-cad3c298e70e?auto=format&fit=crop&w=400&h=300"
              },
            ].map((car, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">{car.type}</p>
                    </div>
                    <p className="font-semibold">{car.price} FCFA/day</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full">Book Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}