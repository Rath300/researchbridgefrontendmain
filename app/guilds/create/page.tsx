"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function CreateGuild() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Prototype: Simulate API call
    setTimeout(() => {
      toast({
        title: "Guild created!",
        description: "Your new research guild has been created successfully.",
      })
      router.push("/guilds") // Redirect to guilds page
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Research Guild</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Guild Name</Label>
              <Input
                id="name"
                placeholder="Enter guild name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your research guild..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topics">Research Topics</Label>
              <Input
                id="topics"
                placeholder="Add topics (comma separated)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories</Label>
              <Input
                id="categories"
                placeholder="Add categories (comma separated)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Guild Logo (Optional)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Guild"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 