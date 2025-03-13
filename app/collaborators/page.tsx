"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronLeft, MessageSquare, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for potential collaborators
const collaborators = [
  {
    id: "1",
    name: "Emma Wilson",
    avatar: "/placeholder.svg",
    school: "Westlake High School",
    grade: "11th Grade",
    interests: ["Neuroscience", "Psychology", "Data Analysis"],
    bio: "Passionate about brain-computer interfaces and their potential applications in treating neurological disorders.",
    projects: 3,
    availability: "10-15 hours/week",
    location: "Boston, MA",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg",
    school: "Oakridge Academy",
    grade: "12th Grade",
    interests: ["Renewable Energy", "Engineering", "Climate Science"],
    bio: "Working on developing more efficient solar panels using novel materials. Looking for collaborators with chemistry background.",
    projects: 5,
    availability: "5-10 hours/week",
    location: "Portland, OR",
  },
  {
    id: "3",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
    school: "Riverside High",
    grade: "10th Grade",
    interests: ["Genetics", "Bioinformatics", "Molecular Biology"],
    bio: "Interested in CRISPR technology and its ethical implications. Currently learning Python for genetic data analysis.",
    projects: 2,
    availability: "8-12 hours/week",
    location: "Chicago, IL",
  },
  {
    id: "4",
    name: "Jamal Williams",
    avatar: "/placeholder.svg",
    school: "Tech Magnet High",
    grade: "12th Grade",
    interests: ["Artificial Intelligence", "Computer Vision", "Robotics"],
    bio: "Building an AI system that can identify plant diseases from images. Looking for collaborators interested in sustainable agriculture.",
    projects: 7,
    availability: "15-20 hours/week",
    location: "Austin, TX",
  },
  {
    id: "5",
    name: "Aisha Patel",
    avatar: "/placeholder.svg",
    school: "Science Academy",
    grade: "11th Grade",
    interests: ["Microbiology", "Public Health", "Epidemiology"],
    bio: "Researching antibiotic resistance in common bacteria. Passionate about improving global health outcomes.",
    projects: 4,
    availability: "10-15 hours/week",
    location: "Seattle, WA",
  },
]

export default function CollaboratorsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matchedIds, setMatchedIds] = useState<string[]>([])
  const [rejectedIds, setRejectedIds] = useState<string[]>([])

  const currentCollaborator = collaborators[currentIndex]
  const filteredCollaborators = collaborators.filter((c) => !matchedIds.includes(c.id) && !rejectedIds.includes(c.id))

  const handleLike = () => {
    setMatchedIds([...matchedIds, currentCollaborator.id])
    if (currentIndex < filteredCollaborators.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleDislike = () => {
    setRejectedIds([...rejectedIds, currentCollaborator.id])
    if (currentIndex < filteredCollaborators.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Find Collaborators</h1>
          <p className="text-muted-foreground">Swipe through potential research partners based on shared interests</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          {filteredCollaborators.length > 0 ? (
            <div className="w-full max-w-md">
              <Card className="overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  {currentCollaborator.interests.map((interest) => (
                    <span key={interest} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt={currentCollaborator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={currentCollaborator.avatar} alt={currentCollaborator.name} />
                      <AvatarFallback>{currentCollaborator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{currentCollaborator.name}</CardTitle>
                      <CardDescription>
                        {currentCollaborator.school} • {currentCollaborator.grade}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{currentCollaborator.bio}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Location:</span> {currentCollaborator.location}
                      </div>
                      <div>
                        <span className="font-medium">Projects:</span> {currentCollaborator.projects}
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span> {currentCollaborator.availability}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm"
                    onClick={handleDislike}
                  >
                    <X className="h-6 w-6 text-destructive" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-background/80 backdrop-blur-sm"
                    onClick={handleLike}
                  >
                    <Check className="h-6 w-6 text-green-500" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Your Matches ({matchedIds.length})</h2>
                {matchedIds.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {collaborators
                      .filter((c) => matchedIds.includes(c.id))
                      .map((match) => (
                        <Card key={match.id} className="flex items-center p-4">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={match.avatar} alt={match.name} />
                            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-medium">{match.name}</h3>
                            <p className="text-sm text-muted-foreground">{match.school}</p>
                          </div>
                          <Button size="sm" className="ml-4">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center">No matches yet. Keep swiping!</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No More Profiles</h2>
              <p className="text-muted-foreground mb-6">You've gone through all available collaborators.</p>
              <Button
                onClick={() => {
                  setMatchedIds([])
                  setRejectedIds([])
                  setCurrentIndex(0)
                }}
              >
                Reset & Start Over
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

