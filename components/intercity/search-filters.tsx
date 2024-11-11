"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { amenities, comfortLevels } from "@/lib/intercity-data"

interface SearchFiltersProps {
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  selectedComfort: string[]
  setSelectedComfort: (value: string[]) => void
  selectedAmenities: string[]
  setSelectedAmenities: (value: string[]) => void
  departureTime: string
  setDepartureTime: (value: string) => void
  onApplyFilters: () => void
}

export function SearchFilters({
  priceRange,
  setPriceRange,
  selectedComfort,
  setSelectedComfort,
  selectedAmenities,
  setSelectedAmenities,
  departureTime,
  setDepartureTime,
  onApplyFilters,
}: SearchFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Results</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label>Price Range (FCFA)</Label>
              <div className="pt-4">
                <Slider
                  value={priceRange}
                  min={0}
                  max={10000}
                  step={500}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2">
                  <span>{priceRange[0]} FCFA</span>
                  <span>{priceRange[1]} FCFA</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Comfort Level</Label>
              <div className="space-y-2">
                {Object.entries(comfortLevels).map(([key, { label, description }]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedComfort.includes(key)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedComfort([...selectedComfort, key])
                        } else {
                          setSelectedComfort(selectedComfort.filter(c => c !== key))
                        }
                      }}
                    />
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedAmenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities([...selectedAmenities, amenity.id])
                        } else {
                          setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.id))
                        }
                      }}
                    />
                    <Label>{amenity.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Departure Time</Label>
              <Select value={departureTime} onValueChange={setDepartureTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="morning">Morning (before 12:00)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (after 12:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={onApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}