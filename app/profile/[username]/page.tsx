"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MapPin, Building2, Link as LinkIcon } from "lucide-react"

// Prototype data
const user = {
  username: "johndoe",
  name: "John Doe",
  avatar_url: "/placeholder-user.jpg",
  bio: "AI Researcher at Stanford University, focusing on machine learning and computer vision. Passionate about making AI more accessible and ethical.",
  location: "Stanford, CA",
  institution: "Stanford University",
  website: "https://johndoe.com",
  expertise: ["Machine Learning", "Computer Vision", "AI Ethics"],
  projects: [
    {
      id: "1",
      title: "AI-Powered Research Assistant",
      description: "An intelligent system that helps researchers analyze papers and generate insights.",
      tags: ["AI", "Machine Learning", "Research"],
      collaborators: 3,
    },
    {
      id: "2",
      title: "Computer Vision for Medical Imaging",
      description: "Developing deep learning models for early disease detection.",
      tags: ["Computer Vision", "Healthcare", "Deep Learning"],
      collaborators: 5,
    },
  ],
  publications: [
    {
      id: "1",
      title: "Ethical Considerations in AI Development",
      venue: "AI Ethics Conference 2024",
      date: "2024-02-15",
      citations: 12,
    },
    {
      id: "2",
      title: "Novel Approach to Object Detection",
      venue: "Computer Vision Journal",
      date: "2024-01-20",
      citations: 8,
    },
  ],
  collaborations: [
    {
      id: "1",
      name: "Jane Smith",
      username: "janesmith",
      avatar_url: "/placeholder-user.jpg",
      role: "Lead Developer",
      project: "AI-Powered Research Assistant",
    },
    {
      id: "2",
      name: "Mike Johnson",
      username: "mikej",
      avatar_url: "/placeholder-user.jpg",
      role: "UI Designer",
      project: "Computer Vision for Medical Imaging",
    },
  ],
}

export default function ProfilePage() {
  const params = useParams()
  const username = params.username

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Header */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </div>
                  <p className="text-muted-foreground">{user.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {user.institution}
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Website
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline">Follow</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="projects" className="space-y-4">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              {user.projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.collaborators} collaborators
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="publications" className="space-y-4">
              {user.publications.map((publication) => (
                <Card key={publication.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{publication.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{publication.venue}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{publication.date}</span>
                      <span>•</span>
                      <span>{publication.citations} citations</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="collaborations" className="space-y-4">
              {user.collaborations.map((collaboration) => (
                <Card key={collaboration.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={collaboration.avatar_url} alt={collaboration.name} />
                        <AvatarFallback>{collaboration.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{collaboration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          @{collaboration.username} • {collaboration.role}
                        </p>
                        <p className="text-sm text-muted-foreground">{collaboration.project}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">{user.projects.length}</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.publications.length}</p>
                  <p className="text-sm text-muted-foreground">Publications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.collaborations.length}</p>
                  <p className="text-sm text-muted-foreground">Collaborators</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">20</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 