import { type NextRequest, NextResponse } from "next/server"
import { supabase, supabaseAdmin, getUser, handleSupabaseError } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")
    const documentId = searchParams.get("documentId")

    if (!projectId) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 })
    }

    // Check if user is a member of the project
    const { data: memberData, error: memberError } = await supabase
      .from("project_members")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .single()

    if (memberError) return NextResponse.json({ error: "You are not a member of this project" }, { status: 403 })

    if (documentId) {
      // Get specific document
      const { data, error } = await supabase
        .from("project_documents")
        .select(`
          *,
          created_by_user:profiles!created_by(full_name, avatar_url),
          updated_by_user:profiles!updated_by(full_name, avatar_url)
        `)
        .eq("id", documentId)
        .eq("project_id", projectId)
        .single()

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json(data)
    } else {
      // Get all documents for the project
      const { data, error } = await supabase
        .from("project_documents")
        .select(`
          *,
          created_by_user:profiles!created_by(full_name, avatar_url),
          updated_by_user:profiles!updated_by(full_name, avatar_url)
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

      return NextResponse.json({ data })
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
    if (!body.projectId || !body.title || !body.type) {
      return NextResponse.json({ error: "Project ID, title, and type are required" }, { status: 400 })
    }

    // Check if user is a member of the project
    const { data: memberData, error: memberError } = await supabase
      .from("project_members")
      .select("*")
      .eq("project_id", body.projectId)
      .eq("user_id", user.id)
      .single()

    if (memberError) return NextResponse.json({ error: "You are not a member of this project" }, { status: 403 })

    // Create document
    const timestamp = new Date().toISOString()
    const { data, error } = await supabaseAdmin
      .from("project_documents")
      .insert({
        project_id: body.projectId,
        title: body.title,
        type: body.type,
        content: body.content || "",
        created_by: user.id,
        updated_by: user.id,
        created_at: timestamp,
        updated_at: timestamp,
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

    if (!body.id || !body.projectId) {
      return NextResponse.json({ error: "Document ID and Project ID are required" }, { status: 400 })
    }

    // Check if user is a member of the project
    const { data: memberData, error: memberError } = await supabase
      .from("project_members")
      .select("*")
      .eq("project_id", body.projectId)
      .eq("user_id", user.id)
      .single()

    if (memberError) return NextResponse.json({ error: "You are not a member of this project" }, { status: 403 })

    // Update document
    const { data, error } = await supabaseAdmin
      .from("project_documents")
      .update({
        title: body.title,
        content: body.content,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .eq("project_id", body.projectId)
      .select()
      .single()

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

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
    const documentId = searchParams.get("documentId")
    const projectId = searchParams.get("projectId")

    if (!documentId || !projectId) {
      return NextResponse.json({ error: "Document ID and Project ID are required" }, { status: 400 })
    }

    // Check if user is a member of the project
    const { data: memberData, error: memberError } = await supabase
      .from("project_members")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .single()

    if (memberError) return NextResponse.json({ error: "You are not a member of this project" }, { status: 403 })

    // Delete document
    const { error } = await supabaseAdmin
      .from("project_documents")
      .delete()
      .eq("id", documentId)
      .eq("project_id", projectId)

    if (error) return NextResponse.json(handleSupabaseError(error), { status: 500 })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(handleSupabaseError(error), { status: 500 })
  }
}

