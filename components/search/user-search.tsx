"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  username: string
  avatar_url?: string
  bio?: string
  expertise?: string[]
}

export function UserSearch() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Prototype data - replace with real API call
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      avatar_url: "/placeholder-user.jpg",
      bio: "AI Researcher at Stanford",
      expertise: ["Machine Learning", "Computer Vision"],
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "janesmith",
      avatar_url: "/placeholder-user.jpg",
      bio: "PhD in Quantum Computing",
      expertise: ["Quantum Computing", "Physics"],
    },
    // Add more prototype users
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          <Search className="mr-2 h-4 w-4" />
          Search users...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search by name or username..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup heading="Users">
              {filteredUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => {
                    // Prototype redirect - replace with actual profile page
                    window.location.href = `/profile/${user.username}`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        @{user.username}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 