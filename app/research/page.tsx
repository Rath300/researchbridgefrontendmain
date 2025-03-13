"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export default function ResearchPage() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // For demo purposes, we'll use a timeout to simulate API call
        setTimeout(() => {
          const mockProjects = [
            {
              id: "1",
              title: "Effects of Microplastics on Freshwater Ecosystems",
              description:
                "Investigating the concentration and effects of microplastics in local lake ecosystems, with a focus on impact to fish populations.",
              category: ["Environmental Science", "Biology"],
              status: "In Progress",
              progress: 65,
              members: 3,
              updated_at: "2023-12-10",
            },
            {
              id: "2",
              title: "Machine Learning for Early Disease Detection",
              description:
                "Developing a neural network model to identify early signs of disease from medical imaging data.",
              category: ["Computer Science", "Healthcare"],
              status: "Planning",
              progress: 25,
              members: 4,
              updated_at: "2023-12-05",
            },
            {
              id: "3",
              title: "Sustainable Urban Agriculture Solutions",
              description:
                "Researching vertical farming techniques and their potential application in urban environments.",
              category: ["Agriculture", "Sustainability"],
              status: "Data Collection",
              progress: 40,
              members: 2,
              updated_at: "2023-11-28",
            },
            {
              id: "4",
              title: "Adolescent Social Media Usage Patterns",
              description:
                "Analyzing the correlation between social media usage and mental health indicators in high school students.",
              category: ["Psychology", "Social Science"],
              status: "Analysis",
              progress: 80,
              members: 3,
              updated_at: "2023-12-01",
            },
          ]
          setProjects(mockProjects)
          setIsLoading(false)
        }, 1000)
      } catch (err: any) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Research Projects</h1>
            <p className="text-muted-foreground">Track and manage your ongoing research projects</p>
          </div>
          <Button asChild>
            <Link href="/research/new">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Card key={project.id} className="card-hover">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    <CardDescription>{project.category.join(", ")}</CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      project.status === "In Progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : project.status === "Planning"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                          : project.status === "Data Collection"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Team:</span> {project.members} members
                    </div>
                    <div>
                      <span className="text-muted-foreground">Updated:</span> {formatDate(project.updated_at)}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/research/${project.id}`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

