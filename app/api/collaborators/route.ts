import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    if (action === "potential") {
      // Get potential collaborators (users not yet matched)
      const { data: existingMatches, error: matchesError } = await supabase
        .from("collaborator_matches")
        .select("matched_user_id")
        .eq("user_id", user.id)

      if (matchesError) return NextResponse.json(handleSupabaseError(matchesError), { status: 500 })

      // Get user's interests to find potential matches
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("interests")
        .eq("id", user.id)
        .single()

      if (userError) return NextResponse.json(handleSupabaseError(userError), { status: 500 })

      // Get users with similar interests who haven't been matched yet
      let query = supabase.from("profiles").select("*")

      // Exclude current user
      query = query.neq("id", user.id)

      // Exclude already matched users
      if (existingMatches.length > 0) {
        const matchedIds = existingMatches.map((match) => match.matched_user_id)
        query = query.not("id", "in", `(${matchedIds.join(",")})`)
      }

      // Filter by interests if user has any
      if (userData.interests && userData.interests.length > 0) {
        query = query.overlaps("interests", userData.interests)
      }

      // Limit results
      query = query.limit(10)

      const { data, error } = await query

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json({ data })
    } else if (action === "matches") {
      // Get user's matches
      const { data, error } = await supabase
        .from("collaborator_matches")
        .select(`
          *,
          matched_user:profiles(*)
        `)
        .eq("user_id", user.id)
        .eq("status", "matched")

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json({ data })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
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
    if (!body.matchedUserId) {
      return NextResponse.json({ error: "Matched user ID is required" }, { status: 400 })
    }

    // Check if match already exists
    const { data: existingMatch, error: existingError } = await supabase
      .from("collaborator_matches")
      .select("*")
      .eq("user_id", user.id)
      .eq("matched_user_id", body.matchedUserId)
      .single()

    if (!existingError && existingMatch) {
      return NextResponse.json({ error: "Match already exists" }, { status: 400 })
    }

    // Create new match
    const timestamp = new Date().toISOString()
    const { data, error } = await supabaseAdmin
      .from("collaborator_matches")
      .insert({
        user_id: user.id,
        matched_user_id: body.matchedUserId,
        status: "pending", // Initial status is pending until the other user also likes
        created_at: timestamp,
      })
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    // Check if the other user has already liked this user
    const { data: reverseMatch, error: reverseError } = await supabase
      .from("collaborator_matches")
      .select("*")
      .eq("user_id", body.matchedUserId)
      .eq("matched_user_id", user.id)
      .single()

    // If both users like each other, update both matches to "matched" status
    if (!reverseError && reverseMatch) {
      await supabaseAdmin.from("collaborator_matches").update({ status: "matched" }).eq("id", data.id)

      await supabaseAdmin.from("collaborator_matches").update({ status: "matched" }).eq("id", reverseMatch.id)

      // Create a conversation for the matched users
      const { data: conversationData, error: conversationError } = await supabaseAdmin
        .from("conversations")
        .insert({
          type: "direct",
          created_at: timestamp,
          updated_at: timestamp,
        })
        .select()
        .single()

      if (!conversationError) {
        // Add participants to the conversation
        await supabaseAdmin.from("conversation_participants").insert([
          {
            conversation_id: conversationData.id,
            user_id: user.id,
            joined_at: timestamp,
          },
          {
            conversation_id: conversationData.id,
            user_id: body.matchedUserId,
            joined_at: timestamp,
          },
        ])

        // Add system message
        await supabaseAdmin.from("messages").insert({
          conversation_id: conversationData.id,
          sender_id: user.id,
          content: "You are now connected! Start collaborating on research projects together.",
          created_at: timestamp,
          read: false,
        })
      }

      return NextResponse.json({
        ...data,
        status: "matched",
        conversation_id: conversationData?.id,
      })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const matchedUserId = searchParams.get("matchedUserId")

    if (!matchedUserId) {
      return NextResponse.json({ error: "Matched user ID is required" }, { status: 400 })
    }

    // Delete the match
    const { error } = await supabaseAdmin
      .from("collaborator_matches")
      .delete()
      .eq("user_id", user.id)
      .eq("matched_user_id", matchedUserId)

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

