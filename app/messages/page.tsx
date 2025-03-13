"use client"

import { useState } from "react"
import { Search, Edit, Phone, Video, Info, Paperclip, Send, Smile, ImageIcon, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"

interface BaseUser {
  id: string
  name: string
  avatar: string
}

interface DirectUser extends BaseUser {
  status?: "online" | "offline"
  lastSeen: string
}

interface GroupMember extends BaseUser {
  // Group members don't need status or lastSeen
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  read: boolean
}

interface DirectConversation {
  id: string
  type: "direct"
  with: DirectUser
  messages: Message[]
  unread: number
}

interface GroupConversation {
  id: string
  type: "group"
  name: string
  members: GroupMember[]
  messages: Message[]
  unread: number
}

type Conversation = DirectConversation | GroupConversation

// Mock data for conversations
const conversations: Conversation[] = [
  {
    id: "1",
    type: "direct",
    with: {
      id: "user1",
      name: "Alex Chen",
      avatar: "/placeholder.svg",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    messages: [
      {
        id: "msg1",
        sender: "user1",
        content: "Hey, have you reviewed the latest data from our microplastics samples?",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        read: true,
      },
      {
        id: "msg2",
        sender: "current-user",
        content: "Yes, I've been analyzing it. The concentration levels are higher than we expected.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true,
      },
      {
        id: "msg3",
        sender: "user1",
        content: "That's concerning. Do you think we should expand our sampling locations?",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: true,
      },
      {
        id: "msg4",
        sender: "current-user",
        content: "Definitely. I'm thinking we should add at least 3 more collection points downstream.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        read: true,
      },
    ],
    unread: 0,
  },
  {
    id: "2",
    type: "direct",
    with: {
      id: "user2",
      name: "Maya Patel",
      avatar: "/placeholder.svg",
      status: "offline",
      lastSeen: new Date(Date.now() - 86400000).toISOString(),
    },
    messages: [
      {
        id: "msg5",
        sender: "user2",
        content: "I've updated the methodology section in our paper. Could you review it?",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        read: true,
      },
    ],
    unread: 0,
  },
  {
    id: "3",
    type: "group",
    name: "Microplastics Research Team",
    members: [
      { id: "user1", name: "Alex Chen", avatar: "/placeholder.svg" },
      { id: "user2", name: "Maya Patel", avatar: "/placeholder.svg" },
      { id: "user3", name: "Jordan Taylor", avatar: "/placeholder.svg" },
      { id: "current-user", name: "You", avatar: "/placeholder.svg" },
    ],
    messages: [
      {
        id: "msg6",
        sender: "user1",
        content: "Team meeting tomorrow at 4pm to discuss our findings.",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
      {
        id: "msg7",
        sender: "user3",
        content: "I'll prepare the presentation with our latest results.",
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        read: false,
      },
      {
        id: "msg8",
        sender: "user2",
        content: "Great! I'll review the statistical analysis section.",
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        read: false,
      },
    ],
    unread: 2,
  },
  {
    id: "4",
    type: "direct",
    with: {
      id: "user3",
      name: "Jordan Taylor",
      avatar: "/placeholder.svg",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    messages: [
      {
        id: "msg9",
        sender: "user3",
        content: "I've created a new visualization for our data. Check it out when you have time.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
      },
    ],
    unread: 1,
  },
  {
    id: "5",
    type: "group",
    name: "ML Algorithm Development",
    members: [
      { id: "user4", name: "Sophia Chen", avatar: "/placeholder.svg" },
      { id: "user5", name: "Marcus Johnson", avatar: "/placeholder.svg" },
      { id: "current-user", name: "You", avatar: "/placeholder.svg" },
    ],
    messages: [
      {
        id: "msg10",
        sender: "user4",
        content: "I've pushed the updated model to our repository. It's achieving 87% accuracy now.",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
    ],
    unread: 0,
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((convo) => {
    if (convo.type === "direct") {
      return convo.with.name.toLowerCase().includes(searchQuery.toLowerCase())
    } else {
      return convo.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
  })

  const sendMessage = () => {
    if (!messageInput.trim()) return

    // In a real app, this would send the message to a backend
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  const formatMessageTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return formatDate(dateStr)
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with your research collaborators and mentors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[75vh]">
          {/* Conversations Sidebar */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-3 mx-3 mt-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="all" className="m-0 p-0">
                  {filteredConversations.map((convo) => (
                    <div
                      key={convo.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                        activeConversation.id === convo.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setActiveConversation(convo)}
                    >
                      {convo.type === "direct" ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={convo.with.avatar} alt={convo.with.name} />
                          <AvatarFallback>{convo.with.name.charAt(0)}</AvatarFallback>
                          {convo.with.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </Avatar>
                      ) : (
                        <div className="relative h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                          <span className="text-primary font-medium text-sm">
                            {(convo as GroupConversation).name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium truncate">
                            {convo.type === "direct" ? convo.with.name : (convo as GroupConversation).name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatMessageTime(convo.messages[convo.messages.length - 1].timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {convo.messages[convo.messages.length - 1].content}
                        </p>
                      </div>

                      {convo.unread > 0 && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs text-primary-foreground font-medium">{convo.unread}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="direct" className="m-0 p-0">
                  {filteredConversations
                    .filter((convo): convo is DirectConversation => convo.type === "direct")
                    .map((convo) => (
                      <div
                        key={convo.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                          activeConversation.id === convo.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveConversation(convo)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={convo.with.avatar} alt={convo.with.name} />
                          <AvatarFallback>{convo.with.name.charAt(0)}</AvatarFallback>
                          {convo.with.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{convo.with.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(convo.messages[convo.messages.length - 1].timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {convo.messages[convo.messages.length - 1].content}
                          </p>
                        </div>

                        {convo.unread > 0 && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs text-primary-foreground font-medium">{convo.unread}</span>
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="groups" className="m-0 p-0">
                  {filteredConversations
                    .filter((convo): convo is GroupConversation => convo.type === "group")
                    .map((convo) => (
                      <div
                        key={convo.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                          activeConversation.id === convo.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setActiveConversation(convo)}
                      >
                        <div className="relative h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                          <span className="text-primary font-medium text-sm">
                            {convo.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{convo.name}</p>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(convo.messages[convo.messages.length - 1].timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {convo.messages[convo.messages.length - 1].sender === "current-user"
                              ? "You: "
                              : `${convo.members.find((m) => m.id === convo.messages[convo.messages.length - 1].sender)?.name}: `}
                            {convo.messages[convo.messages.length - 1].content}
                          </p>
                        </div>

                        {convo.unread > 0 && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs text-primary-foreground font-medium">{convo.unread}</span>
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>
              </div>

              <div className="p-3 border-t mt-auto">
                <Button className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-3 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {activeConversation.type === "direct" ? (
                      <>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={activeConversation.with.avatar} alt={activeConversation.with.name} />
                          <AvatarFallback>{activeConversation.with.name.charAt(0)}</AvatarFallback>
                          {activeConversation.with.status === "online" && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{activeConversation.with.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {activeConversation.with.status === "online"
                              ? "Online"
                              : `Last seen ${formatMessageTime(activeConversation.with.lastSeen)}`}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                          <span className="text-primary font-medium text-sm">
                            {activeConversation.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{activeConversation.name}</p>
                          <p className="text-xs text-muted-foreground">{activeConversation.members.length} members</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start gap-2 max-w-[70%]">
                        {message.sender !== "current-user" && activeConversation.type === "group" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={activeConversation.members.find((m) => m.id === message.sender)?.avatar}
                              alt={activeConversation.members.find((m) => m.id === message.sender)?.name || ""}
                            />
                            <AvatarFallback>
                              {(activeConversation.members.find((m) => m.id === message.sender)?.name || "").charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div>
                          {message.sender !== "current-user" && activeConversation.type === "group" && (
                            <p className="text-xs font-medium mb-1">
                              {activeConversation.members.find((m) => m.id === message.sender)?.name}
                            </p>
                          )}

                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "current-user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>

                          <p className="text-xs text-muted-foreground mt-1">{formatMessageTime(message.timestamp)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button variant="default" size="icon" className="rounded-full" onClick={sendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

