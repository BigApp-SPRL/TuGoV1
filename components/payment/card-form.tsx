"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

interface CardFormProps {
  paymentDetails: {
    cardNumber: string
    expiryDate: string
    cvv: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CardForm({ paymentDetails, onChange }: CardFormProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">{t("Card Number")}</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          placeholder="4111 1111 1111 1111"
          value={paymentDetails.cardNumber}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">{t("Expiry Date")}</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={onChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">{t("CVV")}</Label>
          <Input
            id="cvv"
            name="cvv"
            placeholder="123"
            value={paymentDetails.cvv}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}