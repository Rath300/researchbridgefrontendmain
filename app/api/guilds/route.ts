import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const guildId = searchParams.get("guildId")
    const action = searchParams.get("action")

    if (guildId) {
      // Get specific guild
      const { data, error } = await supabase
        .from("guilds")
        .select(`
          *,
          members:guild_members(
            *,
            user:profiles(id, full_name, avatar_url)
          ),
          projects:guild_projects(
            *,
            project:projects(*)
          )
        `)
        .eq("id", guildId)
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Check if user is a member of this guild
      const isMember = data.members.some((member) => member.user_id === user.id)

      return NextResponse.json({
        ...data,
        isMember,
      })
    } else if (action === "my") {
      // Get guilds the user is a member of
      const { data, error } = await supabase
        .from("guild_members")
        .select(`
          *,
          guild:guilds(*)
        `)
        .eq("user_id", user.id)

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json({
        data: data.map((item) => ({
          ...item.guild,
          role: item.role,
        })),
      })
    } else {
      // Get all guilds (with pagination)
      const page = Number.parseInt(searchParams.get("page") || "1")
      const limit = Number.parseInt(searchParams.get("limit") || "10")
      const search = searchParams.get("search") || ""
      const category = searchParams.get("category")?.split(",") || []

      let query = supabase.from("guilds").select("*", { count: "exact" })

      // Apply search filter
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
      }

      // Apply category filter
      if (category.length > 0) {
        query = query.overlaps("categories", category)
      }

      // Apply pagination
      const from = (page - 1) * limit
      const to = from + limit - 1

      const { data, error, count } = await query.range(from, to).order("ranking", { ascending: true })

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Get member counts for each guild
      const guildsWithCounts = await Promise.all(
        data.map(async (guild) => {
          const { count: memberCount } = await supabase
            .from("guild_members")
            .select("*", { count: "exact" })
            .eq("guild_id", guild.id)

          const { count: projectCount } = await supabase
            .from("guild_projects")
            .select("*", { count: "exact" })
            .eq("guild_id", guild.id)

          return {
            ...guild,
            memberCount,
            projectCount,
          }
        }),
      )

      return NextResponse.json({
        data: guildsWithCounts,
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
    if (!body.name || !body.description || !body.categories) {
      return NextResponse.json({ error: "Name, description, and categories are required" }, { status: 400 })
    }

    // Create guild
    const timestamp = new Date().toISOString()
    const { data, error } = await supabaseAdmin
      .from("guilds")
      .insert({
        name: body.name,
        description: body.description,
        categories: body.categories,
        logo: body.logo,
        ranking: 999, // Default high ranking for new guilds
        score: 0,
        created_at: timestamp,
        updated_at: timestamp,
      })
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    // Add creator as guild member with Leader role
    const { error: memberError } = await supabaseAdmin.from("guild_members").insert({
      guild_id: data.id,
      user_id: user.id,
      role: "Leader",
      joined_at: timestamp,
    })

    if (memberError) return NextResponse.json(handleSupabaseError(memberError), { status: 500 })

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

    if (!body.id) {
      return NextResponse.json({ error: "Guild ID is required" }, { status: 400 })
    }

    // Check if user is a leader of the guild
    const { data: memberData, error: memberError } = await supabase
      .from("guild_members")
      .select("*")
      .eq("guild_id", body.id)
      .eq("user_id", user.id)
      .eq("role", "Leader")
      .single()

    if (memberError) {
      return NextResponse.json({ error: "You are not authorized to update this guild" }, { status: 403 })
    }

    // Update guild
    const { data, error } = await supabaseAdmin
      .from("guilds")
      .update({
        name: body.name,
        description: body.description,
        categories: body.categories,
        logo: body.logo,
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

