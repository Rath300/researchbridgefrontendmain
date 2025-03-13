"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Code, FileText, MessageSquare, Plus, Save, Share, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DocumentEditor } from "@/components/collaborate/document-editor"
import { CodeNotebook } from "@/components/collaborate/code-notebook"
import { TeamChat } from "@/components/collaborate/team-chat"
import { VideoCall } from "@/components/collaborate/video-call"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/components/mode-toggle"

// Mock data for projects
const projects = [
  {
    id: "1",
    title: "Effects of Microplastics on Freshwater Ecosystems",
    documents: [
      { id: "doc1", title: "Research Proposal", type: "document", lastEdited: "2023-11-15", editor: "Alex Chen" },
      { id: "doc2", title: "Methodology", type: "document", lastEdited: "2023-12-01", editor: "Maya Patel" },
      { id: "doc3", title: "Data Analysis", type: "notebook", lastEdited: "2023-12-08", editor: "Jordan Taylor" },
      { id: "doc4", title: "Literature Review", type: "document", lastEdited: "2023-11-20", editor: "Alex Chen" },
    ],
  },
  {
    id: "2",
    title: "Machine Learning for Early Disease Detection",
    documents: [
      { id: "doc1", title: "Project Proposal", type: "document", lastEdited: "2023-12-05", editor: "Marcus Johnson" },
      { id: "doc2", title: "Algorithm Design", type: "notebook", lastEdited: "2023-12-10", editor: "Sophia Chen" },
    ],
  },
]

// Mock data for active collaborators
const activeCollaborators = [
  { id: "1", name: "Alex Chen", avatar: "/placeholder.svg", status: "active" },
  { id: "2", name: "Maya Patel", avatar: "/placeholder.svg", status: "active" },
  { id: "3", name: "Jordan Taylor", avatar: "/placeholder.svg", status: "idle" },
]

export default function CollaboratePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project")
  const documentId = searchParams.get("document")
  const tabParam = searchParams.get("tab")

  const [activeTab, setActiveTab] = useState("document")
  const [isDocumentListOpen, setIsDocumentListOpen] = useState(false)
  const [isNewDocumentOpen, setIsNewDocumentOpen] = useState(false)
  const [newDocTitle, setNewDocTitle] = useState("")
  const [newDocType, setNewDocType] = useState("document")

  // Find the current project and document
  const currentProject = projects.find((p) => p.id === projectId) || projects[0]
  const currentDocument = currentProject.documents.find((d) => d.id === documentId) || currentProject.documents[0]

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  const handleCreateDocument = () => {
    // In a real app, this would create a new document in the database
    console.log("Creating new document:", { title: newDocTitle, type: newDocType })
    setIsNewDocumentOpen(false)
    setNewDocTitle("")
  }

  const handleDocumentSelect = (docId: string) => {
    router.push(`/collaborate?project=${currentProject.id}&document=${docId}`)
    setIsDocumentListOpen(false)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <a href={`/research/${currentProject.id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Project
            </a>
          </Button>
          <ModeToggle />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{currentProject.title}</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setIsDocumentListOpen(true)}
              >
                <FileText className="h-4 w-4 mr-1" />
                {currentDocument.title}
              </Button>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground capitalize">{currentDocument.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {activeCollaborators.map((user) => (
                <Avatar
                  key={user.id}
                  className={`h-8 w-8 border-2 border-background ${
                    user.status === "active" ? "ring-2 ring-green-500" : ""
                  }`}
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="h-8 w-8 border-2 border-background bg-primary">
                <AvatarFallback>+</AvatarFallback>
              </Avatar>
            </div>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Document
              </TabsTrigger>
              <TabsTrigger value="notebook" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Notebook
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Team Chat
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Call
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>2 online</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                  <span>1 idle</span>
                </div>
              </div>

              <Dialog open={isNewDocumentOpen} onOpenChange={setIsNewDocumentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Document</DialogTitle>
                    <DialogDescription>Add a new document or notebook to your project.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newDocTitle}
                        onChange={(e) => setNewDocTitle(e.target.value)}
                        placeholder="Enter document title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select value={newDocType} onValueChange={setNewDocType}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Text Document</SelectItem>
                          <SelectItem value="notebook">Code Notebook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewDocumentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateDocument} disabled={!newDocTitle}>
                      Create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isDocumentListOpen} onOpenChange={setIsDocumentListOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Project Documents</DialogTitle>
                    <DialogDescription>Select a document to open or create a new one.</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                      {currentProject.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-muted ${
                            doc.id === currentDocument.id ? "bg-muted" : ""
                          }`}
                          onClick={() => handleDocumentSelect(doc.id)}
                        >
                          <div className="flex items-center gap-3">
                            {doc.type === "document" ? (
                              <FileText className="h-5 w-5 text-blue-500" />
                            ) : (
                              <Code className="h-5 w-5 text-purple-500" />
                            )}
                            <div>
                              <p className="font-medium">{doc.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Last edited by {doc.editor} on {new Date(doc.lastEdited).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsNewDocumentOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <TabsContent value="document" className="mt-0">
                <DocumentEditor />
              </TabsContent>

              <TabsContent value="notebook" className="mt-0">
                <CodeNotebook />
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <TeamChat />
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <VideoCall />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}

