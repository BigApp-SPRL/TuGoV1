"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { LoadingButton } from "@/components/loading-button"

export function PaymentMethods({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const router = useRouter()

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: t("error"),
        description: t("selectPaymentMethod"),
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: t("success"),
        description: t("paymentSuccessful"),
      })
      
      onSuccess()
      router.push("/profile")
    } catch (error) {
      toast({
        title: t("error"),
        description: t("paymentFailed"),
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-4 cursor-pointer ${selectedMethod === 'card' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setSelectedMethod('card')}
        >
          <div className="flex items-center space-x-4">
            <Icons.creditCard className="h-6 w-6" />
            <div>
              <h3 className="font-medium">{t("creditCard")}</h3>
              <p className="text-sm text-muted-foreground">{t("viaMasterCardVisa")}</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer ${selectedMethod === 'mobile' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setSelectedMethod('mobile')}
        >
          <div className="flex items-center space-x-4">
            <Icons.smartphone className="h-6 w-6" />
            <div>
              <h3 className="font-medium">{t("mobileMoney")}</h3>
              <p className="text-sm text-muted-foreground">{t("viaMtnOrange")}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-center py-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">{t("total")}</p>
          <p className="text-2xl font-bold">{amount.toLocaleString()} FCFA</p>
        </div>

        <LoadingButton
          onClick={handlePayment}
          isLoading={isProcessing}
          disabled={!selectedMethod}
        >
          {t("pay")}
        </LoadingButton>
      </div>
    </div>
  )
}