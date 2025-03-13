import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Beaker, BookOpen, Flame, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Connect, Collaborate, <span className="gradient-text">Discover</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join the premier platform for high school researchers to connect, collaborate, and showcase their
                  work.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Research collaboration"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover What's Possible</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ResearchNexus provides all the tools you need to take your research to the next level.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover">
              <CardHeader>
                <Beaker className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Research Collaboration</CardTitle>
                <CardDescription>
                  Work together on groundbreaking research with peers who share your interests.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/research" className="text-primary flex items-center gap-1 text-sm">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="card-hover">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Find Collaborators</CardTitle>
                <CardDescription>Connect with like-minded researchers through our matching system.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/collaborators" className="text-primary flex items-center gap-1 text-sm">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="card-hover">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Mentor Matching</CardTitle>
                <CardDescription>Get guidance from experienced mentors in your field of interest.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/mentors" className="text-primary flex items-center gap-1 text-sm">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="card-hover">
              <CardHeader>
                <Flame className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Research Guilds</CardTitle>
                <CardDescription>
                  Join research guilds to collaborate on multiple projects and climb the leaderboards.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/guilds" className="text-primary flex items-center gap-1 text-sm">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Article of the Day */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Featured Research</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Article of the Day</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover groundbreaking research from our community of young scientists.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="Featured research"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  The Impact of Microplastics on Marine Ecosystems
                </h3>
                <p className="text-muted-foreground">By Sarah Johnson, Westlake High School</p>
              </div>
              <p className="text-muted-foreground">
                This groundbreaking study examines the long-term effects of microplastic pollution on marine life, with
                a focus on coral reef ecosystems. Using innovative sampling techniques, the research reveals concerning
                trends in microplastic accumulation.
              </p>
              <Button asChild>
                <Link href="/articles/microplastics-marine-ecosystems">Read Full Article</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Research Journey?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of young researchers who are making discoveries and building their future.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/explore">Explore Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

