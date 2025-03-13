"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookmarkPlus, MessageSquare, Share2, ThumbsUp } from "lucide-react"

// Prototype data
const article = {
  id: "1",
  title: "Breakthrough in Quantum Computing: New Algorithm Shows Promise",
  content: `
    <p>Researchers have developed a novel quantum algorithm that could revolutionize cryptography and secure communication systems. The new approach, developed by a team at Stanford University, demonstrates unprecedented efficiency in solving complex mathematical problems that form the basis of modern encryption.</p>

    <h2>Key Findings</h2>
    <p>The algorithm, which has been tested extensively in laboratory conditions, shows a 40% improvement in processing speed compared to existing quantum computing methods. This breakthrough could have significant implications for:</p>
    <ul>
      <li>Secure communication systems</li>
      <li>Financial transaction processing</li>
      <li>Climate modeling</li>
      <li>Drug discovery</li>
    </ul>

    <h2>Methodology</h2>
    <p>The research team employed a combination of theoretical modeling and practical implementation to develop the algorithm. Using state-of-the-art quantum computing hardware, they were able to demonstrate the algorithm's effectiveness across various use cases.</p>

    <h2>Future Implications</h2>
    <p>This development marks a significant step forward in the field of quantum computing. The team is now working on optimizing the algorithm for specific applications and exploring potential commercial implementations.</p>
  `,
  author: {
    name: "Dr. Sarah Chen",
    avatar_url: "/placeholder-user.jpg",
    institution: "Stanford University",
    bio: "Leading researcher in quantum computing and cryptography with over 15 years of experience.",
  },
  category: "Quantum Computing",
  readTime: "5 min read",
  date: "2024-03-13",
  tags: ["Quantum Computing", "Algorithms", "Cryptography"],
  likes: 124,
  comments: 32,
}

export default function ArticlePage() {
  const params = useParams()
  const articleId = params.id

  return (
    <div className="container max-w-4xl py-8">
      <article className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={article.author.avatar_url} alt={article.author.name} />
              <AvatarFallback>{article.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-sm text-muted-foreground">{article.author.institution}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <div 
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{article.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{article.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">About the Author</h2>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={article.author.avatar_url} alt={article.author.name} />
              <AvatarFallback>{article.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{article.author.name}</h3>
              <p className="text-muted-foreground">{article.author.institution}</p>
              <p className="mt-2">{article.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 