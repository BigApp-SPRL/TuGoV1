export const mockTrips = [
  {
    id: "1",
    from: "Yaoundé",
    to: "Douala",
    date: "2024-01-20",
    departureTime: "08:00",
    arrivalTime: "11:30",
    price: 5000,
    company: "TuGo Express",
    busType: "Luxury Coach",
    availableSeats: 24,
    amenities: ["AC", "WiFi", "USB Charging", "Snacks"],
    comfort: "premium"
  },
  {
    id: "2",
    from: "Yaoundé",
    to: "Douala",
    date: "2024-01-20",
    departureTime: "10:00",
    arrivalTime: "13:30",
    price: 4500,
    company: "Comfort Line",
    busType: "Standard Coach",
    availableSeats: 12,
    amenities: ["AC"],
    comfort: "standard"
  },
  {
    id: "3",
    from: "Yaoundé",
    to: "Bamenda",
    date: "2024-01-20",
    departureTime: "07:00",
    arrivalTime: "14:30",
    price: 7000,
    company: "TuGo Express",
    busType: "VIP Coach",
    availableSeats: 18,
    amenities: ["AC", "WiFi", "USB Charging", "Snacks"],
    comfort: "premium"
  }
]

export const popularRoutes = [
  { from: "Yaoundé", to: "Douala", price: "5000" },
  { from: "Yaoundé", to: "Bamenda", price: "7000" },
  { from: "Douala", to: "Bafoussam", price: "6000" },
  { from: "Yaoundé", to: "Kribi", price: "4500" },
  { from: "Douala", to: "Limbe", price: "3500" },
]

export const comfortLevels = {
  basic: { label: "Basic", description: "Essential transport service" },
  standard: { label: "Standard", description: "Comfortable journey with basic amenities" },
  premium: { label: "Premium", description: "Luxury travel with all amenities" }
}

export const amenities = [
  { id: "ac", label: "Air Conditioning" },
  { id: "wifi", label: "WiFi" },
  { id: "usb", label: "USB Charging" },
  { id: "snacks", label: "Snacks" },
  { id: "toilet", label: "Toilet" },
  { id: "entertainment", label: "Entertainment System" }
]