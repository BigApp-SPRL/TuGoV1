"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  phone?: string
}

interface PendingBooking {
  tripId: string
  selectedSeats: number
  isRoundTrip: boolean
  returnUrl: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  handleSocialSignIn: (provider: string) => Promise<void>
  pendingBooking: PendingBooking | null
  setPendingBooking: (booking: PendingBooking | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pendingBooking, setPendingBooking] = useState<PendingBooking | null>(null)
  const router = useRouter()

  // Check for stored auth state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+237600000000'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))

      // Handle pending booking if exists
      if (pendingBooking) {
        router.push(pendingBooking.returnUrl)
        setPendingBooking(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true)
    try {
      // Simulate social auth
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+237600000000'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))

      // Handle pending booking if exists
      if (pendingBooking) {
        router.push(pendingBooking.returnUrl)
        setPendingBooking(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signOut,
      handleSocialSignIn,
      pendingBooking,
      setPendingBooking
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}