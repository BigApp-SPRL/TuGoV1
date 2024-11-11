"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bus, Car, MapPin, Search } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

type SearchCategory = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  path: string
  locations?: {
    from: string
    to: string[]
    price: string
  }[]
}

const categories: SearchCategory[] = [
  {
    id: "intercity",
    title: "Intercity Travel",
    icon: <Bus className="h-4 w-4" />,
    description: "Book bus tickets and carpooling between cities",
    path: "/intercity",
    locations: [
      {
        from: "Yaoundé",
        to: ["Douala", "Bamenda", "Bafoussam", "Kribi"],
        price: "from 5000 FCFA"
      }
    ]
  },
  {
    id: "urban",
    title: "Urban Transport",
    icon: <Car className="h-4 w-4" />,
    description: "Request rides within the city",
    path: "/urban",
    locations: [
      {
        from: "Yaoundé",
        to: ["Bastos", "Mvog-Mbi", "Mvan", "Nsam"],
        price: "from 500 FCFA"
      }
    ]
  },
  {
    id: "rental",
    title: "Car Rental",
    icon: <MapPin className="h-4 w-4" />,
    description: "Rent vehicles with or without chauffeur",
    path: "/rental",
    locations: [
      {
        from: "Yaoundé",
        to: ["Airport", "City Center", "Bastos"],
        price: "from 25000 FCFA/day"
      }
    ]
  }
]

export function IntelligentSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const currentLocation = "Yaoundé"

  const filteredResults = React.useMemo(() => {
    if (!query) return categories

    const searchTerms = query.toLowerCase().split(" ")
    
    return categories.flatMap(category => {
      const locations = category.locations?.filter(loc => 
        loc.from.toLowerCase() === currentLocation.toLowerCase() &&
        loc.to.some(dest => 
          dest.toLowerCase().includes(query.toLowerCase())
        )
      ) || []

      if (locations.length > 0) {
        return locations.flatMap(loc => 
          loc.to
            .filter(dest => dest.toLowerCase().includes(query.toLowerCase()))
            .map(dest => ({
              ...category,
              title: `${category.title} to ${dest}`,
              description: `From ${loc.from} to ${dest} - ${loc.price}`,
              customPath: `${category.path}?from=${encodeURIComponent(loc.from)}&to=${encodeURIComponent(dest)}`
            }))
        )
      }

      const matchesCategory = searchTerms.every(term => 
        category.title.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term)
      )

      return matchesCategory ? [category] : []
    })
  }, [query, currentLocation])

  const handleSelect = (item: any) => {
    router.push(item.customPath || item.path)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder={`Where would you like to go from ${currentLocation}?`}
            className="flex-1 placeholder:text-muted-foreground"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        <CommandList>
          <CommandEmpty>No destinations found for your search.</CommandEmpty>
          <CommandGroup heading="Available Services">
            {filteredResults.map((item, index) => (
              <CommandItem
                key={`${item.id}-${index}`}
                value={item.title}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-accent"
              >
                <div className="flex items-center gap-2 flex-1">
                  {item.icon}
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}