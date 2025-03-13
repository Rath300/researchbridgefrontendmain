"use client"

import { useState } from "react"
import { Mic, MicOff, Phone, PhoneOff, VideoIcon, VideoOff, Users, Settings, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function VideoCall() {
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Mock data for participants
  const participants = [
    { id: "1", name: "Alex Chen", avatar: "/placeholder.svg", status: "active" },
    { id: "2", name: "Maya Patel", avatar: "/placeholder.svg", status: "active" },
    { id: "3", name: "Jordan Taylor", avatar: "/placeholder.svg", status: "idle" },
    { id: "current", name: "You", avatar: "/placeholder.svg", status: "active" },
  ]

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">Video Call</h3>
          <p className="text-sm text-muted-foreground">Microplastics Research Team</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={isInCall ? "default" : "outline"} size="sm" onClick={() => setIsInCall(!isInCall)}>
            {isInCall ? <PhoneOff className="h-4 w-4 mr-2 text-red-500" /> : <Phone className="h-4 w-4 mr-2" />}
            {isInCall ? "End Call" : "Start Call"}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 bg-muted/30 flex flex-col items-center justify-center">
        {isInCall ? (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center relative"
                  >
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 left-2 text-xs bg-background/80 px-2 py-1 rounded-md">
                      {participant.name}
                    </div>
                    {participant.id === "current" && isMuted && (
                      <div className="absolute top-2 right-2">
                        <MicOff className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-background/80 p-2 rounded-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share screen</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setIsInCall(false)}
                    >
                      <PhoneOff className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>End call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <VideoIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start a Video Call</h3>
            <p className="text-muted-foreground mb-6">Collaborate in real-time with your team members</p>
            <Button onClick={() => setIsInCall(true)}>
              <Phone className="h-4 w-4 mr-2" />
              Start Call
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{participants.length} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Call quality: Good</span>
            <div className="flex">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="h-2 w-2 bg-muted rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

