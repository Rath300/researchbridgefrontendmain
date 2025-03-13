import { type NextRequest, NextResponse } from "next/server"
import { supabase, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get("articleId")

    if (articleId) {
      // Get specific article
      const { data, error } = await supabase
        .from("research_articles")
        .select(`
          *,
          author:profiles!user_id(id, full_name, avatar_url, school),
          comments:article_comments(
            *,
            user:profiles(id, full_name, avatar_url)
          )
        `)
        .eq("id", articleId)
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Check if user has liked this article
      const { data: likeData, error: likeError } = await supabase
        .from("article_likes")
        .select("*")
        .eq("article_id", articleId)
        .eq("user_id", user.id)
        .single()

      return NextResponse.json({
        ...data,
        userLiked: !likeError,
      })
    } else {
      // Mock data for demo purposes
      const mockArticles = [
        {
          id: "1",
          title: "The Effects of Climate Change on Butterfly Migration Patterns",
          abstract:
            "Our study tracked monarch butterfly migration over three years, revealing significant shifts in timing and routes due to changing climate conditions.",
          author: {
            id: "user1",
            full_name: "Alex Chen",
            avatar_url: "/placeholder.svg",
            school: "Oakridge High School",
          },
          tags: ["Climate Change", "Ecology", "Migration"],
          likes: 124,
          commentCount: 32,
          published_date: "2023-11-15",
        },
        {
          id: "2",
          title: "Developing a Machine Learning Algorithm to Predict Protein Folding",
          abstract:
            "We created a novel ML approach that predicts protein structures with 87% accuracy, potentially accelerating drug discovery processes.",
          author: {
            id: "user2",
            full_name: "Maya Patel",
            avatar_url: "/placeholder.svg",
            school: "Westview Academy",
          },
          tags: ["Machine Learning", "Biochemistry", "Proteins"],
          likes: 98,
          commentCount: 17,
          published_date: "2023-12-02",
        },
        {
          id: "3",
          title: "The Psychological Impact of Social Media on Adolescents",
          abstract:
            "Our research surveyed 500 high school students to analyze correlations between social media usage patterns and reported anxiety levels.",
          author: {
            id: "user3",
            full_name: "Jordan Taylor",
            avatar_url: "/placeholder.svg",
            school: "Riverside High",
          },
          tags: ["Psychology", "Social Media", "Mental Health"],
          likes: 156,
          commentCount: 45,
          published_date: "2023-10-28",
        },
        {
          id: "4",
          title: "Developing Biodegradable Plastics from Agricultural Waste",
          abstract:
            "We successfully created a biodegradable plastic alternative using corn husks and other agricultural byproducts that decomposes in under 6 months.",
          author: {
            id: "user4",
            full_name: "Liam Johnson",
            avatar_url: "/placeholder.svg",
            school: "Greenfield Academy",
          },
          tags: ["Materials Science", "Sustainability", "Bioplastics"],
          likes: 112,
          commentCount: 29,
          published_date: "2023-11-05",
        },
      ]

      return NextResponse.json({
        data: mockArticles,
        pagination: {
          page: 1,
          limit: 10,
          total: mockArticles.length,
          pages: 1,
        },
      })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

