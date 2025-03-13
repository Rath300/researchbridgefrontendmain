import { supabase } from "@/lib/supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

// Helper function to subscribe to real-time updates
export function subscribeToChannel(
  channelName: string,
  table: string,
  event: "INSERT" | "UPDATE" | "DELETE" | "*" = "*",
  filter?: string,
  callback: (payload: any) => void,
): RealtimeChannel {
  let channel = supabase.channel(channelName)

  if (filter) {
    channel = channel.on(
      "postgres_changes",
      {
        event,
        schema: "public",
        table,
        filter,
      },
      callback,
    )
  } else {
    channel = channel.on(
      "postgres_changes",
      {
        event,
        schema: "public",
        table,
      },
      callback,
    )
  }

  channel.subscribe()
  return channel
}

// Helper function to unsubscribe from real-time updates
export function unsubscribeFromChannel(channel: RealtimeChannel) {
  supabase.removeChannel(channel)
}

