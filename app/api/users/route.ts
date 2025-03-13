import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (userId) {
      // Get specific user
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json(data)
    } else {
      // Get all users (with pagination)
      const page = Number.parseInt(searchParams.get("page") || "1")
      const limit = Number.parseInt(searchParams.get("limit") || "10")
      const search = searchParams.get("search") || ""
      const interests = searchParams.get("interests")?.split(",") || []

      let query = supabase.from("profiles").select("*", { count: "exact" })

      // Apply search filter
      if (search) {
        query = query.or(`full_name.ilike.%${search}%,bio.ilike.%${search}%`)
      }

      // Apply interests filter
      if (interests.length > 0) {
        query = query.contains("interests", interests)
      }

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await query.range(from, to).order("created_at", { ascending: false })

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json({
        data,
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

    // Validate required fields
    if (!body.full_name) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }

    // Create or update profile
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: body.full_name,
        avatar_url: body.avatar_url,
        bio: body.bio,
        school: body.school,
        grade: body.grade,
        location: body.location,
        interests: body.interests,
        skills: body.skills,
        availability: body.availability,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    return NextResponse.json(data)
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

    // Update profile
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

