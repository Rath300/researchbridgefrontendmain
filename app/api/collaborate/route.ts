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

    if (documentId) {
      // Get specific document
      const { data, error } = await supabase
        .from("project_documents")
        .select("*")
        .eq("id", documentId)
        .eq("project_id", projectId)
        .single()

      if (error) return handleSupabaseError(error)

      return NextResponse.json(data)
    } else {
      // Get all documents for the project
      const { data, error } = await supabase
        .from("project_documents")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) return handleSupabaseError(error)

      return NextResponse.json(data)
    }
  } catch (error: any) {
    return handleSupabaseError(error)
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

    // Create document
    const { data, error } = await supabaseAdmin
      .from("project_documents")
      .insert({
        project_id: body.projectId,
        title: body.title,
        type: body.type,
        content: body.content || "",
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) return handleSupabaseError(error)

    return NextResponse.json(data)
  } catch (error: any) {
    return handleSupabaseError(error)
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

    // Update document
    const { data, error } = await supabaseAdmin
      .from("project_documents")
      .update({
        title: body.title,
        content: body.content,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      })
      .eq("id", body.id)
      .eq("project_id", body.projectId)
      .select()
      .single()

    if (error) return handleSupabaseError(error)

    return NextResponse.json(data)
  } catch (error: any) {
    return handleSupabaseError(error)
  }
}

