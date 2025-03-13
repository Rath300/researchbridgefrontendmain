"use client"

import { useState } from "react"
import { MessageSquare, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamChat } from "@/components/collaborate/team-chat"
import { VideoCall } from "@/components/collaborate/video-call"

export function VideoChat() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="flex flex-col h-[70vh]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="mt-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Team Chat
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Call
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 p-0 m-0">
          <TeamChat />
        </TabsContent>

        <TabsContent value="video" className="flex-1 p-0 m-0">
          <VideoCall />
        </TabsContent>
      </Tabs>
    </div>
  )
}

