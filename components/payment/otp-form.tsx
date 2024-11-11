"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"

interface OTPFormProps {
  otp: string
  onChange: (value: string) => void
}

export function OTPForm({ otp, onChange }: OTPFormProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">{t("Enter OTP")}</Label>
        <Input
          id="otp"
          value={otp}
          onChange={(e) => onChange(e.target.value)}
          placeholder="123456"
          maxLength={6}
          className="text-center text-2xl tracking-widest"
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {t("Please enter the 6-digit code sent to your phone")}
      </p>
    </div>
  )
}