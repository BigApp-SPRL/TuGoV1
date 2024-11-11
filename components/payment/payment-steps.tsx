"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { PaymentMethods } from "./payment-methods"
import { CardForm } from "./card-form"
import { MobileMoneyForm } from "./mobile-money-form"
import { OTPForm } from "./otp-form"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { useBooking } from "@/hooks/use-booking"

interface PaymentStepsProps {
  amount: number
}

type PaymentStep = "method" | "details" | "otp" | "processing" | "success"

export function PaymentSteps({ amount }: PaymentStepsProps) {
  const [step, setStep] = useState<PaymentStep>("method")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [mobileDetails, setMobileDetails] = useState({
    provider: "",
    phoneNumber: ""
  })
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const { reset: resetBooking } = useBooking()

  const handleMethodSelect = (method: string) => {
    setPaymentMethod(method)
    setStep("details")
  }

  const handleDetailsSubmit = () => {
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        toast({
          title: t("Error"),
          description: t("Please fill in all card details"),
          variant: "destructive",
        })
        return
      }
    } else {
      if (!mobileDetails.provider || !mobileDetails.phoneNumber) {
        toast({
          title: t("Error"),
          description: t("Please fill in all mobile money details"),
          variant: "destructive",
        })
        return
      }
    }

    setStep("otp")
    toast({
      title: t("OTP Sent"),
      description: t("Please check your phone for the OTP code"),
    })
  }

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      toast({
        title: t("Error"),
        description: t("Please enter a valid 6-digit OTP"),
        variant: "destructive",
      })
      return
    }

    setStep("processing")
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep("success")
      toast({
        title: t("Success"),
        description: t("Payment completed successfully! Redirecting to dashboard..."),
      })

      // Reset booking state
      resetBooking()

      // Redirect to dashboard after a short delay
    
      setTimeout(() => {
        router.push("/profile/dashboard")
      }, 0)
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Payment failed. Please try again."),
        variant: "destructive",
      })
      setStep("details")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    if (step === "details") {
      setStep("method")
    } else if (step === "otp") {
      setStep("details")
    }
  }

  if (step === "method") {
    return <PaymentMethods selectedMethod={paymentMethod} onMethodChange={handleMethodSelect} />
  }

  if (step === "details") {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Change Payment Method")}
        </Button>

        {paymentMethod === "card" ? (
          <CardForm
            paymentDetails={cardDetails}
            onChange={(e) => setCardDetails({
              ...cardDetails,
              [e.target.name]: e.target.value
            })}
          />
        ) : (
          <MobileMoneyForm
            paymentDetails={mobileDetails}
            onProviderChange={(value) => setMobileDetails({
              ...mobileDetails,
              provider: value
            })}
            onPhoneNumberChange={(e) => setMobileDetails({
              ...mobileDetails,
              phoneNumber: e.target.value
            })}
          />
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">{t("Total Amount")}</p>
            <p className="text-2xl font-bold">{amount.toLocaleString()} FCFA</p>
          </div>

          <Button onClick={handleDetailsSubmit}>
            {t("Continue to Verification")}
          </Button>
        </div>
      </div>
    )
  }

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("Back")}
        </Button>

        <OTPForm
          otp={otp}
          onChange={(value) => setOtp(value)}
        />

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" onClick={() => setOtp("123456")}>
            {t("Use Test OTP (123456)")}
          </Button>

          <Button onClick={handleOTPSubmit}>
            {t("Verify & Pay")}
          </Button>
        </div>
      </div>
    )
  }

  if (step === "processing" || step === "success") {
    return (
      <div className="py-8 text-center space-y-4">
        {step === "processing" ? (
          <>
            <Icons.spinner className="mx-auto h-8 w-8 animate-spin text-primary" />
            <h3 className="text-lg font-medium">{t("Processing Payment...")}</h3>
            <p className="text-muted-foreground">{t("Please wait while we process your payment")}</p>
          </>
        ) : (
          <>
            <Icons.check className="mx-auto h-8 w-8 text-green-500" />
            <h3 className="text-lg font-medium">{t("Payment Successful!")}</h3>
            <p className="text-muted-foreground">
              {t("Redirecting you to your dashboard...")}
            </p>
          </>
        )}
      </div>
    )
  }

  return null
}