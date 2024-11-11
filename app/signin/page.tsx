"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"
import { Icons } from "@/components/icons"

export default function SignInPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/")
      toast({
        title: "Success",
        description: "Successfully signed in",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-lg mx-auto py-16 px-4">
      <Card className="p-6">
        <Tabs defaultValue="signin" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t("Sign In")}</TabsTrigger>
            <TabsTrigger value="signup">{t("Sign Up")}</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">{t("Welcome back")}</h1>
                <p className="text-muted-foreground">
                  {t("Enter your credentials to sign in")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("Email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("Password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("Sign In")}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("Or continue with")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => {}} disabled={isLoading}>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" onClick={() => {}} disabled={isLoading}>
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div className="space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">{t("Create an account")}</h1>
                <p className="text-muted-foreground">
                  {t("Enter your details to create your account")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t("Name")}</Label>
                  <Input
                    id="signup-name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("Email")}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("Password")}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("Sign Up")}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("Or continue with")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => {}} disabled={isLoading}>
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" onClick={() => {}} disabled={isLoading}>
                  <Icons.facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}