import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for research guilds
const guilds = [
  {
    id: "1",
    name: "Quantum Explorers",
    logo: "/placeholder.svg",
    description: "Exploring quantum computing applications and theoretical physics research.",
    members: 24,
    projects: 8,
    ranking: 1,
    categories: ["Physics", "Computer Science"],
    featuredProject: "Quantum Algorithm for Climate Modeling",
  },
  {
    id: "2",
    name: "BioInnovators",
    logo: "/placeholder.svg",
    description: "Advancing research in biotechnology, genetics, and medical applications.",
    members: 32,
    projects: 12,
    ranking: 2,
    categories: ["Biology", "Medicine", "Genetics"],
    featuredProject: "CRISPR Applications in Rare Disease Treatment",
  },
  {
    id: "3",
    name: "EcoSolutions",
    logo: "/placeholder.svg",
    description: "Developing sustainable solutions to environmental challenges through interdisciplinary research.",
    members: 28,
    projects: 10,
    ranking: 3,
    categories: ["Environmental Science", "Engineering"],
    featuredProject: "Microplastic Filtration System for Urban Waterways",
  },
  {
    id: "4",
    name: "Neural Networks",
    logo: "/placeholder.svg",
    description: "Researching artificial intelligence, machine learning, and cognitive science.",
    members: 19,
    projects: 7,
    ranking: 4,
    categories: ["AI", "Neuroscience", "Computer Science"],
    featuredProject: "Neural Network for Early Alzheimer's Detection",
  },
  {
    id: "5",
    name: "Social Dynamics",
    logo: "/placeholder.svg",
    description: "Studying human behavior, social interactions, and psychological phenomena.",
    members: 22,
    projects: 9,
    ranking: 5,
    categories: ["Psychology", "Sociology"],
    featuredProject: "Impact of Digital Communication on Adolescent Development",
  },
]

export default function GuildsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Research Guilds</h1>
            <p className="text-muted-foreground">Join collaborative research communities and climb the leaderboards</p>
          </div>
          <Button asChild>
            <Link href="/guilds/create">Create Guild</Link>
          </Button>
        </div>

        <div className="bg-muted rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Top Ranked Guilds
          </h2>
          <div className="overflow-x-auto">
            <div className="inline-flex gap-4 pb-2">
              {guilds.slice(0, 3).map((guild, index) => (
                <div key={guild.id} className="flex flex-col items-center p-4 bg-card rounded-lg border min-w-[200px]">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={guild.logo || "/placeholder.svg"}
                      alt={guild.name}
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      #{index + 1}
                    </div>
                  </div>
                  <h3 className="font-bold text-center">{guild.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{guild.projects} projects</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map((guild) => (
            <Card key={guild.id} className="card-hover">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={guild.logo} alt={guild.name} />
                  <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center">
                    {guild.name}
                    {guild.ranking <= 3 && <Award className="h-4 w-4 ml-2 text-amber-500" />}
                  </CardTitle>
                  <CardDescription>Rank #{guild.ranking}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{guild.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guild.categories.map((category) => (
                    <span
                      key={category}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-xs font-medium">Featured Project:</p>
                  <p className="text-sm">{guild.featuredProject}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {guild.members} members
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/guilds/${guild.id}`} className="flex items-center">
                    View Guild
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

