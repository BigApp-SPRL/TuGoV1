"use client"

import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { PaymentSteps } from "@/components/payment/payment-steps"
import { useLanguage } from "@/components/language-provider"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const amount = Number(searchParams.get("amount")) || 0
  const { t } = useLanguage()

  return (
    <div className="container max-w-lg py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{t("Complete Payment")}</h1>
        <p className="text-muted-foreground">{t("Choose your preferred payment method")}</p>
      </div>

      <Card className="p-6">
        <PaymentSteps amount={amount} />
      </Card>
    </div>
  )
}