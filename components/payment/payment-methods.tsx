"use client"

import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { useLanguage } from "@/components/language-provider"

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
}

export function PaymentMethods({ selectedMethod, onMethodChange }: PaymentMethodsProps) {
  const { t } = useLanguage()

  const methods = [
    {
      id: "card",
      name: t("Credit/Debit Card"),
      icon: Icons.creditCard
    },
    {
      id: "mobile",
      name: t("Mobile Money"),
      icon: Icons.smartphone
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {methods.map((method) => {
        const Icon = method.icon
        return (
          <Card
            key={method.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? "border-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-6 w-6" />
              <span className="font-medium">{method.name}</span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}