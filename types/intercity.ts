export interface Trip {
  id: string
  from: string
  to: string
  date: string
  departureTime: string
  price: number
  company: string
  busType: string
  availableSeats: number
  amenities: string[]
  comfort: string
}