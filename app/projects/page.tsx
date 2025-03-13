"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

// Prototype data
const projects = [
  {
    id: "1",
    title: "AI-Powered Research Assistant",
    description: "An intelligent system that helps researchers analyze papers and generate insights.",
    tags: ["AI", "Machine Learning", "Research"],
    owner: {
      name: "John Doe",
      username: "johndoe",
      avatar_url: "/placeholder-user.jpg",
    },
    collaborators: 3,
    createdAt: "2024-03-13",
    status: "active",
  },
  {
    id: "2",
    title: "Computer Vision for Medical Imaging",
    description: "Developing deep learning models for early disease detection.",
    tags: ["Computer Vision", "Healthcare", "Deep Learning"],
    owner: {
      name: "Jane Smith",
      username: "janesmith",
      avatar_url: "/placeholder-user.jpg",
    },
    collaborators: 5,
    createdAt: "2024-03-12",
    status: "active",
  },
  {
    id: "3",
    title: "Quantum Computing Applications",
    description: "Exploring practical applications of quantum computing in cryptography.",
    tags: ["Quantum Computing", "Cryptography", "Physics"],
    owner: {
      name: "Mike Johnson",
      username: "mikej",
      avatar_url: "/placeholder-user.jpg",
    },
    collaborators: 2,
    createdAt: "2024-03-11",
    status: "active",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Research Projects</h1>
            <p className="text-muted-foreground">Discover and collaborate on research projects</p>
          </div>
          <Button onClick={() => router.push("/projects/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={project.owner.avatar_url} alt={project.owner.name} />
                        <AvatarFallback>{project.owner.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.owner.name}</p>
                        <p className="text-sm text-muted-foreground">@{project.owner.username}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.collaborators} collaborators
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">Created {project.createdAt}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 