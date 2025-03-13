import Link from "next/link"
import { BookOpen, Calendar, MessageSquare, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for mentors
const mentors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar: "/placeholder.svg",
    title: "Associate Professor of Biochemistry",
    institution: "Stanford University",
    specialties: ["Molecular Biology", "Genetics", "CRISPR"],
    bio: "Researching novel applications of CRISPR technology in treating genetic disorders. Passionate about mentoring the next generation of scientists.",
    rating: 4.9,
    reviews: 28,
    availability: "2-3 hours/week",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    avatar: "/placeholder.svg",
    title: "Assistant Professor of Computer Science",
    institution: "MIT",
    specialties: ["Machine Learning", "Computer Vision", "AI Ethics"],
    bio: "Working at the intersection of AI and healthcare. Interested in guiding students on projects related to ethical AI applications.",
    rating: 4.7,
    reviews: 35,
    availability: "1-2 hours/week",
  },
  {
    id: "3",
    name: "Dr. Amara Patel",
    avatar: "/placeholder.svg",
    title: "Research Scientist",
    institution: "NASA Jet Propulsion Laboratory",
    specialties: ["Astrophysics", "Planetary Science", "Data Analysis"],
    bio: "Currently working on Mars rover data analysis. Excited to help students explore space science and astronomy research.",
    rating: 4.8,
    reviews: 19,
    availability: "3-4 hours/week",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    avatar: "/placeholder.svg",
    title: "Professor of Environmental Science",
    institution: "UC Berkeley",
    specialties: ["Climate Science", "Sustainability", "Ecology"],
    bio: "Leading research on climate change impacts on coastal ecosystems. Committed to supporting young researchers interested in environmental solutions.",
    rating: 4.6,
    reviews: 31,
    availability: "2-3 hours/week",
  },
  {
    id: "5",
    name: "Dr. Elena Rodriguez",
    avatar: "/placeholder.svg",
    title: "Neuroscientist",
    institution: "Harvard Medical School",
    specialties: ["Neuroscience", "Cognitive Psychology", "Brain Imaging"],
    bio: "Studying the neural basis of learning and memory. Enjoys mentoring students interested in brain science and psychology.",
    rating: 4.9,
    reviews: 24,
    availability: "1-2 hours/week",
  },
  {
    id: "6",
    name: "Prof. David Kim",
    avatar: "/placeholder.svg",
    title: "Associate Professor of Physics",
    institution: "Caltech",
    specialties: ["Quantum Physics", "Theoretical Physics", "Computational Modeling"],
    bio: "Researching quantum computing applications. Looking to mentor students with strong math backgrounds interested in theoretical physics.",
    rating: 4.8,
    reviews: 22,
    availability: "2-3 hours/week",
  },
]

export default function MentorsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Connect with Mentors</h1>
          <p className="text-muted-foreground">
            Find experienced researchers and professors to guide your research journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="card-hover">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{mentor.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
                      {mentor.rating} ({mentor.reviews} reviews)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{mentor.title}</p>
                  <p className="text-sm text-muted-foreground">{mentor.institution}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-sm">{mentor.bio}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Availability: {mentor.availability}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/mentors/${mentor.id}/request`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Request Mentorship
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/mentors/${mentor.id}/message`}>
                    <MessageSquare className="h-4 w-4" />
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

