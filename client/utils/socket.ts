import io from "socket.io-client"

let socket: ReturnType<typeof io> | null = null

export const initializeSocket = (token: string) => {
  if (socket) return socket

  socket = io(process.env.NEXT_PUBLIC_API_URL || "https://researchbridge-server.onrender.com", {
    auth: {
      token,
    },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.on("connect", () => {
    console.log("Socket connected")
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected")
  })

  socket.on("error", (error: Error) => {
    console.error("Socket error:", error)
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.")
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

