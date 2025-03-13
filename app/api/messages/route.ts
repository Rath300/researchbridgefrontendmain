import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (conversationId) {
      // Check if user is a participant in the conversation
      const { data: participantData, error: participantError } = await supabase
        .from("conversation_participants")
        .select("*")
        .eq("conversation_id", conversationId)
        .eq("user_id", user.id)
        .single()

      if (participantError) {
        return NextResponse.json({ error: "You are not a participant in this conversation" }, { status: 403 })
      }

      // Get messages for a specific conversation
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:profiles(id, full_name, avatar_url)
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      // Mark messages as read
      await supabaseAdmin
        .from("messages")
        .update({ read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id)
        .eq("read", false)

      return NextResponse.json({ data })
    } else {
      // Get all conversations for the user
      const { data: conversationsData, error: conversationsError } = await supabase
        .from("conversation_participants")
        .select(`
          conversation:conversations(
            id,
            type,
            name,
            created_at,
            updated_at,
            last_message:messages(id, content, created_at, sender_id)
          )
        `)
        .eq("user_id", user.id)

      if (conversationsError) return NextResponse.json(handleSupabaseError(conversationsError), { status: 500 })

      // Get participants for each conversation
      const conversations = await Promise.all(
        conversationsData.map(async (item) => {
          const conversation = item.conversation

          // Get participants
          const { data: participants, error: participantsError } = await supabase
            .from("conversation_participants")
            .select(`
              user:profiles(id, full_name, avatar_url)
            `)
            .eq("conversation_id", conversation.id)
            .neq("user_id", user.id)

          if (participantsError) return conversation

          // Get unread messages count
          const { count: unreadCount, error: unreadError } = await supabase
            .from("messages")
            .select("*", { count: "exact" })
            .eq("conversation_id", conversation.id)
            .neq("sender_id", user.id)
            .eq("read", false)

          return {
            ...conversation,
            participants: participants.map((p) => p.user),
            unread: unreadCount || 0,
          }
        }),
      )

      return NextResponse.json({ data: conversations })
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

    // Check if creating a new conversation or sending a message to an existing one
    if (body.newConversation) {
      // Validate required fields for new conversation
      if (!body.participants || !body.participants.length || !body.content) {
        return NextResponse.json({ error: "Participants and content are required" }, { status: 400 })
      }

      // Create new conversation
      const timestamp = new Date().toISOString()
      const { data: conversationData, error: conversationError } = await supabaseAdmin
        .from("conversations")
        .insert({
          type: body.participants.length > 1 ? "group" : "direct",
          name: body.name || null,
          created_at: timestamp,
          updated_at: timestamp,
        })
        .select()
        .single()

      if (conversationError) return NextResponse.json(handleSupabaseError(conversationError), { status: 500 })

      // Add participants
      const participantsToAdd = [...body.participants, user.id]
      const participantInserts = participantsToAdd.map((participantId) => ({
        conversation_id: conversationData.id,
        user_id: participantId,
        joined_at: timestamp,
      }))

      const { error: participantsError } = await supabaseAdmin
        .from("conversation_participants")
        .insert(participantInserts)

      if (participantsError) return NextResponse.json(handleSupabaseError(participantsError), { status: 500 })

      // Create message
      const { data: messageData, error: messageError } = await supabaseAdmin
        .from("messages")
        .insert({
          conversation_id: conversationData.id,
          sender_id: user.id,
          content: body.content,
          created_at: timestamp,
          read: false,
        })
        .select()
        .single()

      if (messageError) return NextResponse.json(handleSupabaseError(messageError), { status: 500 })

      // Update conversation's last_message_id
      await supabaseAdmin
        .from("conversations")
        .update({ last_message_id: messageData.id, updated_at: timestamp })
        .eq("id", conversationData.id)

      return NextResponse.json({
        conversation: conversationData,
        message: messageData,
      })
    } else {
      // Validate required fields for existing conversation
      if (!body.conversationId || !body.content) {
        return NextResponse.json({ error: "Conversation ID and content are required" }, { status: 400 })
      }

      // Check if user is a participant in the conversation
      const { data: participantData, error: participantError } = await supabase
        .from("conversation_participants")
        .select("*")
        .eq("conversation_id", body.conversationId)
        .eq("user_id", user.id)
        .single()

      if (participantError) {
        return NextResponse.json({ error: "You are not a participant in this conversation" }, { status: 403 })
      }

      // Create message
      const timestamp = new Date().toISOString()
      const { data: messageData, error: messageError } = await supabaseAdmin
        .from("messages")
        .insert({
          conversation_id: body.conversationId,
          sender_id: user.id,
          content: body.content,
          created_at: timestamp,
          read: false,
        })
        .select()
        .single()

      if (messageError) return NextResponse.json(handleSupabaseError(messageError), { status: 500 })

      // Update conversation's last_message_id and updated_at
      await supabaseAdmin
        .from("conversations")
        .update({ last_message_id: messageData.id, updated_at: timestamp })
        .eq("id", body.conversationId)

      return NextResponse.json(messageData)
    }
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

