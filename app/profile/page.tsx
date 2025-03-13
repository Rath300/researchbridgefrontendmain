"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    full_name: "",
    avatar_url: "",
    bio: "",
    school: "",
    grade: "",
    location: "",
    interests: [],
    skills: [],
    availability: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return

      try {
        const response = await fetch(`/api/users?userId=${user.id}`)
        if (!response.ok) throw new Error("Failed to fetch profile")

        const data = await response.json()
        if (data) {
          setProfile(data)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update profile")
      }

      setSuccess("Profile updated successfully")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(",").map((item) => item.trim())
    setProfile((prev) => ({ ...prev, interests }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((item) => item.trim())
    setProfile((prev) => ({ ...prev, skills }))
  }

  const handleImageUpload = (url: string) => {
    setProfile((prev) => ({ ...prev, avatar_url: url }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information and preferences</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <ImageUpload onUpload={handleImageUpload} defaultImage={profile.avatar_url} className="mb-4" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" name="full_name" value={profile.full_name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself and your research interests"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  name="school"
                  value={profile.school}
                  onChange={handleChange}
                  placeholder="Your school or institution"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade/Year</Label>
                <Select value={profile.grade} onValueChange={(value) => handleSelectChange("grade", value)}>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade/year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th">9th Grade</SelectItem>
                    <SelectItem value="10th">10th Grade</SelectItem>
                    <SelectItem value="11th">11th Grade</SelectItem>
                    <SelectItem value="12th">12th Grade</SelectItem>
                    <SelectItem value="freshman">College Freshman</SelectItem>
                    <SelectItem value="sophomore">College Sophomore</SelectItem>
                    <SelectItem value="junior">College Junior</SelectItem>
                    <SelectItem value="senior">College Senior</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="City, State, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Research Interests (comma separated)</Label>
              <Input
                id="interests"
                name="interests"
                value={profile.interests.join(", ")}
                onChange={handleInterestsChange}
                placeholder="Biology, Computer Science, Psychology"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                name="skills"
                value={profile.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="Data Analysis, Programming, Lab Techniques"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select value={profile.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10">5-10 hours/week</SelectItem>
                  <SelectItem value="10-15">10-15 hours/week</SelectItem>
                  <SelectItem value="15-20">15-20 hours/week</SelectItem>
                  <SelectItem value="20+">20+ hours/week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving} className="ml-auto">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

