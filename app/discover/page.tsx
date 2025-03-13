import Image from "next/image"
import { BookmarkPlus, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

// Mock data for research posts
const researchPosts = [
  {
    id: "1",
    title: "The Effects of Climate Change on Butterfly Migration Patterns",
    excerpt:
      "Our study tracked monarch butterfly migration over three years, revealing significant shifts in timing and routes due to changing climate conditions.",
    author: {
      name: "Alex Chen",
      avatar: "/placeholder.svg",
      school: "Oakridge High School",
    },
    image: "/placeholder.svg?height=300&width=600",
    likes: 124,
    comments: 32,
    date: "2023-11-15",
    tags: ["Climate Change", "Ecology", "Migration"],
  },
  {
    id: "2",
    title: "Developing a Machine Learning Algorithm to Predict Protein Folding",
    excerpt:
      "We created a novel ML approach that predicts protein structures with 87% accuracy, potentially accelerating drug discovery processes.",
    author: {
      name: "Maya Patel",
      avatar: "/placeholder.svg",
      school: "Westview Academy",
    },
    image: "/placeholder.svg?height=300&width=600",
    likes: 98,
    comments: 17,
    date: "2023-12-02",
    tags: ["Machine Learning", "Biochemistry", "Proteins"],
  },
  {
    id: "3",
    title: "The Psychological Impact of Social Media on Adolescents",
    excerpt:
      "Our research surveyed 500 high school students to analyze correlations between social media usage patterns and reported anxiety levels.",
    author: {
      name: "Jordan Taylor",
      avatar: "/placeholder.svg",
      school: "Riverside High",
    },
    image: "/placeholder.svg?height=300&width=600",
    likes: 156,
    comments: 45,
    date: "2023-10-28",
    tags: ["Psychology", "Social Media", "Mental Health"],
  },
  {
    id: "4",
    title: "Developing Biodegradable Plastics from Agricultural Waste",
    excerpt:
      "We successfully created a biodegradable plastic alternative using corn husks and other agricultural byproducts that decomposes in under 6 months.",
    author: {
      name: "Liam Johnson",
      avatar: "/placeholder.svg",
      school: "Greenfield Academy",
    },
    image: "/placeholder.svg?height=300&width=600",
    likes: 112,
    comments: 29,
    date: "2023-11-05",
    tags: ["Materials Science", "Sustainability", "Bioplastics"],
  },
]

export default function DiscoverPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Discover Research</h1>
          <p className="text-muted-foreground">
            Explore groundbreaking research from high school students around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden card-hover">
              <div className="aspect-video relative">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{post.author.name}</span>
                    <span className="text-xs text-muted-foreground">{post.author.school}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">{formatDate(post.date)}</div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="ml-1 text-xs">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                    <span className="ml-1 text-xs">{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}

