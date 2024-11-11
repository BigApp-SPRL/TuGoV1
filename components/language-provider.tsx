"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "search.placeholder": "Where would you like to go?",
    "search.from": "From",
    "search.to": "To",
    "search.date": "Date",
    "search.passengers": "Passengers",
    "search.roundTrip": "Round Trip",
    "search.search": "Search",
    "search.noResults": "No trips found for your search criteria",
    "filter.comfort": "Comfort Level",
    "filter.price": "Price Range",
    "filter.time": "Departure Time",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    "booking.seats": "Available Seats",
    "booking.price": "Price per Seat",
    "booking.total": "Total Price",
    "booking.book": "Book Now",
    "booking.forSelf": "Booking for myself",
    "booking.forOthers": "Booking for someone else",
    // Add more translations as needed
  },
  fr: {
    "search.placeholder": "Où souhaitez-vous aller ?",
    "search.from": "De",
    "search.to": "À",
    "search.date": "Date",
    "search.passengers": "Passagers",
    "search.roundTrip": "Aller-retour",
    "search.search": "Rechercher",
    "search.noResults": "Aucun trajet trouvé pour vos critères de recherche",
    "filter.comfort": "Niveau de confort",
    "filter.price": "Fourchette de prix",
    "filter.time": "Heure de départ",
    "auth.signin": "Se connecter",
    "auth.signup": "S'inscrire",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.name": "Nom complet",
    "auth.phone": "Numéro de téléphone",
    "booking.seats": "Sièges disponibles",
    "booking.price": "Prix par siège",
    "booking.total": "Prix total",
    "booking.book": "Réserver maintenant",
    "booking.forSelf": "Je réserve pour moi-même",
    "booking.forOthers": "Je réserve pour quelqu'un d'autre",
    // Add more translations as needed
  },
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>("en")
  const router = useRouter()

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
  }, [])

  const t = React.useCallback(
    (key: string) => {
      return translations[language][key as keyof typeof translations.en] || key
    },
    [language]
  )

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}