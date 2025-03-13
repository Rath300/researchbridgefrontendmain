import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for browser usage (limited permissions)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (full permissions)
export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : supabase

// Helper to get user from server component
export async function getUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session?.user || null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error("Supabase error:", error)
  return { error: error.message || "An unexpected error occurred" }
}

