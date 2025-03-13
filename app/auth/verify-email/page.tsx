"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyEmail() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>We've sent you a verification link to your email address</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Mail className="h-16 w-16 text-primary mb-4" />
          <p className="text-center mb-4">
            Please check your email inbox and click on the verification link to complete your registration.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            If you don't see the email, check your spam folder or try signing in again to resend the verification email.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/signin">Return to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

