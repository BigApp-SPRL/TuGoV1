"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

interface MobileMoneyFormProps {
  paymentDetails: {
    provider: string
    phoneNumber: string
  }
  onProviderChange: (value: string) => void
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function MobileMoneyForm({ paymentDetails, onProviderChange, onPhoneNumberChange }: MobileMoneyFormProps) {
  const { t } = useLanguage()

  const providers = [
    { id: "mtn", name: "MTN Mobile Money" },
    { id: "orange", name: "Orange Money" }
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t("Provider")}</Label>
        <Select value={paymentDetails.provider} onValueChange={onProviderChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select provider")} />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">{t("Phone Number")}</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="6XXXXXXXX"
          value={paymentDetails.phoneNumber}
          onChange={onPhoneNumberChange}
        />
      </div>
    </div>
  )
}