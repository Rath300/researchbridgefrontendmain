"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Prototype data
const articles = [
  {
    id: "1",
    title: "Breakthrough in Quantum Computing: New Algorithm Shows Promise",
    excerpt: "Researchers have developed a novel quantum algorithm that could revolutionize cryptography...",
    author: {
      name: "Dr. Sarah Chen",
      avatar_url: "/placeholder-user.jpg",
      institution: "Stanford University",
    },
    category: "Quantum Computing",
    readTime: "5 min read",
    date: "2024-03-13",
    tags: ["Quantum Computing", "Algorithms", "Cryptography"],
  },
  {
    id: "2",
    title: "AI Models Show Remarkable Progress in Protein Folding",
    excerpt: "New deep learning models are achieving unprecedented accuracy in predicting protein structures...",
    author: {
      name: "Prof. Michael Brown",
      avatar_url: "/placeholder-user.jpg",
      institution: "MIT",
    },
    category: "AI",
    readTime: "7 min read",
    date: "2024-03-12",
    tags: ["AI", "Biology", "Machine Learning"],
  },
  {
    id: "3",
    title: "Revolutionary Approach to Climate Change: Carbon Capture Technology",
    excerpt: "Scientists have developed a new method for capturing and storing carbon dioxide...",
    author: {
      name: "Dr. Emily Zhang",
      avatar_url: "/placeholder-user.jpg",
      institution: "UC Berkeley",
    },
    category: "Environmental Science",
    readTime: "6 min read",
    date: "2024-03-11",
    tags: ["Climate Change", "Technology", "Environmental Science"],
  },
]

export default function DiscoverPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Discover Research</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/discover/${article.id}`)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={article.author.avatar_url} alt={article.author.name} />
                      <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-sm text-muted-foreground">{article.author.institution}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{article.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

