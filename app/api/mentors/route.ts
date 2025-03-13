import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const mentorId = searchParams.get("mentorId")

    if (mentorId) {
      // Get specific mentor
      const { data, error } = await supabase
        .from("mentors")
        .select(`
          *,
          reviews:mentor_reviews(
            *,
            user:profiles(id, full_name, avatar_url)
          )
        `)
        .eq("id", mentorId)
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Check if user has a pending or active mentorship with this mentor
      const { data: mentorshipData, error: mentorshipError } = await supabase
        .from("mentorship_requests")
        .select("*")
        .eq("mentor_id", mentorId)
        .eq("student_id", user.id)
        .or("status.eq.pending,status.eq.accepted")
        .single()

      return NextResponse.json({
        ...data,
        mentorship: mentorshipError ? null : mentorshipData,
      })
    } else {
      // Get all mentors (with pagination)
      const page = Number.parseInt(searchParams.get("page") || "1")
      const limit = Number.parseInt(searchParams.get("limit") || "10")
      const search = searchParams.get("search") || ""
      const specialty = searchParams.get("specialty")?.split(",") || []

      let query = supabase.from("mentors").select("*", { count: "exact" })

      // Apply search filter
      if (search) {
        query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%,institution.ilike.%${search}%`)
      }

      // Apply specialty filter
      if (specialty.length > 0) {
        query = query.overlaps("specialties", specialty)
      }

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await query.range(from, to).order("rating", { ascending: false })

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Get review counts for each mentor
      const mentorsWithCounts = await Promise.all(
        data.map(async (mentor) => {
          const { count: reviewCount } = await supabase
            .from("mentor_reviews")
            .select("*", { count: "exact" })
            .eq("mentor_id", mentor.id)

          return {
            ...mentor,
            reviewCount,
          }
        }),
      )

      return NextResponse.json({
        data: mentorsWithCounts,
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: count ? Math.ceil(count / limit) : 0,
        },
      })
    }
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Check if creating a mentor profile or requesting mentorship
    if (body.action === "request") {
      // Validate required fields for mentorship request
      if (!body.mentorId || !body.projectDescription || !body.goals) {
        return NextResponse.json({ error: "Mentor ID, project description, and goals are required" }, { status: 400 })
      }

      // Check if a request already exists
      const { data: existingRequest, error: existingError } = await supabase
        .from("mentorship_requests")
        .select("*")
        .eq("mentor_id", body.mentorId)
        .eq("student_id", user.id)
        .or("status.eq.pending,status.eq.accepted")
        .single()

      if (!existingError && existingRequest) {
        return NextResponse.json(
          { error: "You already have a pending or accepted request with this mentor" },
          { status: 400 },
        )
      }

      // Create mentorship request
      const timestamp = new Date().toISOString()
      const { data, error } = await supabaseAdmin
        .from("mentorship_requests")
        .insert({
          mentor_id: body.mentorId,
          student_id: user.id,
          project_description: body.projectDescription,
          goals: body.goals,
          duration: body.duration,
          status: "pending",
          created_at: timestamp,
          updated_at: timestamp,
        })
        .select()
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json(data)
    } else {
      // Creating a mentor profile
      // Validate required fields
      if (!body.name || !body.email || !body.title || !body.institution || !body.specialties || !body.bio) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 })
      }

      // Check if user already has a mentor profile
      const { data: existingProfile, error: existingError } = await supabase
        .from("mentors")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (!existingError && existingProfile) {
        return NextResponse.json({ error: "You already have a mentor profile" }, { status: 400 })
      }

      // Create mentor profile
      const timestamp = new Date().toISOString()
      const { data, error } = await supabaseAdmin
        .from("mentors")
        .insert({
          user_id: user.id,
          name: body.name,
          email: body.email,
          title: body.title,
          institution: body.institution,
          specialties: body.specialties,
          bio: body.bio,
          availability: body.availability,
          rating: 0,
          created_at: timestamp,
          updated_at: timestamp,
        })
        .select()
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json(data)
    }
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: "Mentor ID is required" }, { status: 400 })
    }

    // Check if user owns this mentor profile
    const { data: mentorData, error: mentorError } = await supabase
      .from("mentors")
      .select("*")
      .eq("id", body.id)
      .eq("user_id", user.id)
      .single()

    if (mentorError) {
      return NextResponse.json({ error: "You are not authorized to update this mentor profile" }, { status: 403 })
    }

    // Update mentor profile
    const { data, error } = await supabaseAdmin
      .from("mentors")
      .update({
        name: body.name,
        email: body.email,
        title: body.title,
        institution: body.institution,
        specialties: body.specialties,
        bio: body.bio,
        availability: body.availability,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

