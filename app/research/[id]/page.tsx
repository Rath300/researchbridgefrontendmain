"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Beaker,
  Calendar,
  Edit,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Share,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/utils"

// Mock data for a research project
const projectData = {
  id: "1",
  title: "Effects of Microplastics on Freshwater Ecosystems",
  status: "In Progress",
  description:
    "Investigating the concentration and effects of microplastics in local lake ecosystems, with a focus on impact to fish populations.",
  members: [
    { id: "1", name: "Alex Chen", avatar: "/placeholder.svg", role: "Leader" },
    { id: "2", name: "Maya Patel", avatar: "/placeholder.svg", role: "Contributor" },
    { id: "3", name: "Jordan Taylor", avatar: "/placeholder.svg", role: "Contributor" },
  ],
  lastUpdated: "2023-12-10",
  progress: 65,
  category: ["Environmental Science", "Biology"],
  documents: [
    { id: "doc1", title: "Research Proposal", type: "Document", lastEdited: "2023-11-15", editor: "Alex Chen" },
    { id: "doc2", title: "Methodology", type: "Document", lastEdited: "2023-12-01", editor: "Maya Patel" },
    { id: "doc3", title: "Data Analysis", type: "Notebook", lastEdited: "2023-12-08", editor: "Jordan Taylor" },
    { id: "doc4", title: "Literature Review", type: "Document", lastEdited: "2023-11-20", editor: "Alex Chen" },
  ],
  timeline: [
    { milestone: "Project Proposal", dueDate: "2023-10-15", completed: true },
    { milestone: "Literature Review", dueDate: "2023-11-30", completed: true },
    { milestone: "Data Collection", dueDate: "2023-12-31", completed: false },
    { milestone: "Data Analysis", dueDate: "2024-01-31", completed: false },
    { milestone: "Final Report", dueDate: "2024-02-28", completed: false },
  ],
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, we would fetch the project data based on the ID
  const project = projectData

  const handleCollaborateClick = (documentId?: string) => {
    if (documentId) {
      router.push(`/collaborate?project=${project.id}&document=${documentId}`)
    } else {
      router.push(`/collaborate?project=${project.id}`)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/research">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  project.status === "In Progress"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : project.status === "Planning"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      : project.status === "Data Collection"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                }`}
              >
                {project.status}
              </span>
              {project.category.map((cat) => (
                <span key={cat} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={() => handleCollaborateClick()}>
              <Edit className="h-4 w-4 mr-2" />
              Collaborate
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Timeline</h4>
                      <div className="space-y-2">
                        {project.timeline.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  item.completed ? "bg-green-500" : "border-2 border-muted-foreground"
                                }`}
                              />
                              <span className={item.completed ? "line-through text-muted-foreground" : ""}>
                                {item.milestone}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">{formatDate(item.dueDate)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Maya Patel" />
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Maya Patel</span> updated the methodology document
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Jordan Taylor" />
                          <AvatarFallback>JT</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Jordan Taylor</span> added a new data analysis notebook
                          </p>
                          <p className="text-xs text-muted-foreground">Yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="Alex Chen" />
                          <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Alex Chen</span> completed the literature review milestone
                          </p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Project Documents</h2>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Document
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCollaborateClick()}>
                        <FileText className="h-4 w-4 mr-2" />
                        Text Document
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCollaborateClick()}>
                        <Beaker className="h-4 w-4 mr-2" />
                        Code Notebook
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.documents.map((doc) => (
                  <Card key={doc.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{doc.title}</CardTitle>
                          <CardDescription>{doc.type}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleCollaborateClick(doc.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last edited on {formatDate(doc.lastEdited)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edited by {doc.editor}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => handleCollaborateClick(doc.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Open
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Team Members</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {project.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove from Project</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => router.push(`/collaborate?project=${project.id}&tab=chat`)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Team Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/collaborate?project=${project.id}&tab=chat`)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

