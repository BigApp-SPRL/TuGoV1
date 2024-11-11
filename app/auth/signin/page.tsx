"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Icons } from "@/components/icons"

export default function SignInPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signIn, handleSocialSignIn, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const returnUrl = searchParams.get('returnUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      toast({
        title: "Success",
        description: "You have been successfully signed in.",
      })
      router.push(returnUrl)
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password.",
        variant: "destructive",
      })
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      await handleSocialSignIn(provider)
      toast({
        title: "Success",
        description: "You have been successfully signed in.",
      })
      router.push(returnUrl)
    } catch (error) {
      toast({
        title: "Error",
        description: "Social sign in failed. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <Icons.facebook className="mr-2 h-4 w-4" />
            Continue with Facebook
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            <Link href="/auth/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link 
              href={`/auth/signup${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`}
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}