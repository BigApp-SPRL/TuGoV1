"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Trip } from '@/types/intercity'

interface PassengerInfo {
  type: string
  details: {
    name: string
    email: string
    phone: string
  }
  seats: number
  isRoundTrip: boolean
}

interface BookingState {
  selectedTrip: Trip | null
  seats: number
  roundTrip: boolean
  returnTrip: Trip | null
  passengerInfo: PassengerInfo | null
  setSelectedTrip: (trip: Trip | null) => void
  setSeats: (seats: number) => void
  setRoundTrip: (roundTrip: boolean) => void
  setReturnTrip: (trip: Trip | null) => void
  setPassengerInfo: (info: PassengerInfo) => void
  reset: () => void
}

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      selectedTrip: null,
      seats: 1,
      roundTrip: false,
      returnTrip: null,
      passengerInfo: null,
      setSelectedTrip: (trip) => set({ selectedTrip: trip }),
      setSeats: (seats) => set({ seats }),
      setRoundTrip: (roundTrip) => set({ roundTrip }),
      setReturnTrip: (trip) => set({ returnTrip: trip }),
      setPassengerInfo: (info) => set({ passengerInfo: info }),
      reset: () =>
        set({
          selectedTrip: null,
          seats: 1,
          roundTrip: false,
          returnTrip: null,
          passengerInfo: null,
        }),
    }),
    {
      name: 'booking-storage',
    }
  )
)