"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

// Prototype data
const project = {
  id: "1",
  title: "AI-Powered Research Assistant",
  description: "An intelligent system that helps researchers analyze papers and generate insights.",
  tags: ["AI", "Machine Learning", "Research"],
  github: "https://github.com/username/project",
  createdAt: "2024-03-13",
  owner: {
    name: "John Doe",
    username: "johndoe",
    avatar_url: "/placeholder-user.jpg",
  },
  collaborators: [
    {
      name: "Jane Smith",
      username: "janesmith",
      avatar_url: "/placeholder-user.jpg",
      role: "Lead Developer",
    },
    {
      name: "Mike Johnson",
      username: "mikej",
      avatar_url: "/placeholder-user.jpg",
      role: "UI Designer",
    },
  ],
  updates: [
    {
      id: "1",
      title: "Initial Setup",
      description: "Project repository created and basic structure implemented.",
      date: "2024-03-13",
    },
    {
      id: "2",
      title: "UI Components",
      description: "Added basic UI components and styling.",
      date: "2024-03-12",
    },
  ],
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id

  return (
    <div className="container py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <div className="flex gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Button>Join Project</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">GitHub Repository</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {project.github}
                  </a>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Created</h3>
                  <p className="text-muted-foreground">{project.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4">
          {project.updates.map((update) => (
            <Card key={update.id}>
              <CardHeader>
                <CardTitle className="text-lg">{update.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{update.description}</p>
                <p className="text-sm text-muted-foreground">{update.date}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Project Owner</h3>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={project.owner.avatar_url} alt={project.owner.name} />
                      <AvatarFallback>{project.owner.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{project.owner.name}</p>
                      <p className="text-sm text-muted-foreground">@{project.owner.username}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Collaborators</h3>
                  <div className="space-y-2">
                    {project.collaborators.map((collaborator) => (
                      <div key={collaborator.username} className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={collaborator.avatar_url} alt={collaborator.name} />
                          <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{collaborator.name}</p>
                          <p className="text-sm text-muted-foreground">
                            @{collaborator.username} • {collaborator.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 