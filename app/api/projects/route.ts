import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"
import crypto from "crypto"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    if (projectId) {
      // Get specific project
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          members:project_members(*, user:profiles(*)),
          documents:project_documents(*)
        `)
        .eq("id", projectId)
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json(data)
    } else {
      // Mock data for projects since we're just deploying a frontend demo
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
          description: "Researching vertical farming techniques and their potential application in urban environments.",
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

      return NextResponse.json({ data: mockProjects })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Generate timestamp proof
    const timestamp = new Date().toISOString()
    const hash = crypto
      .createHash("sha256")
      .update(`${body.title}${body.description}${timestamp}${user.id}`)
      .digest("hex")

    // Create project
    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({
        title: body.title,
        description: body.description,
        category: body.category || [],
        status: body.status || "Planning",
        progress: body.progress || 0,
        created_at: timestamp,
        updated_at: timestamp,
        timestamp_proof: hash,
      })
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    // Add creator as project member
    const { error: memberError } = await supabaseAdmin.from("project_members").insert({
      project_id: data.id,
      user_id: user.id,
      role: "Leader",
      joined_at: timestamp,
    })

    if (memberError) return NextResponse.json(handleSupabaseError(memberError), { status: 500 })

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

