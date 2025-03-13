"use client"

import { useState } from "react"
import { Send, PlusCircle, Smile, Paperclip, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// Mock data for chat messages
const initialMessages = [
  {
    id: "1",
    sender: { id: "2", name: "Maya Patel", avatar: "/placeholder.svg" },
    content: "I've updated the methodology section with our latest sampling techniques.",
    timestamp: "10:32 AM",
  },
  {
    id: "2",
    sender: { id: "1", name: "Alex Chen", avatar: "/placeholder.svg" },
    content: "Looks good! I think we should add more details about the spectroscopic analysis.",
    timestamp: "10:35 AM",
  },
  {
    id: "3",
    sender: { id: "3", name: "Jordan Taylor", avatar: "/placeholder.svg" },
    content: "I've been working on the data visualization. Check out the new scatter plot in the notebook.",
    timestamp: "10:40 AM",
  },
  {
    id: "4",
    sender: { id: "2", name: "Maya Patel", avatar: "/placeholder.svg" },
    content: "Great work! The correlation between depth and microplastic concentration is really clear now.",
    timestamp: "10:42 AM",
  },
]

export function TeamChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      sender: { id: "current-user", name: "You", avatar: "/placeholder.svg" },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="p-4 border-b">
        <h3 className="font-medium">Team Chat</h3>
        <p className="text-sm text-muted-foreground">Microplastics Research Team</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Smile className="h-5 w-5" />
          </Button>
          <Button variant="default" size="icon" className="rounded-full h-8 w-8" onClick={sendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

