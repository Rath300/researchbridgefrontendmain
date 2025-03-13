"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        className: "border bg-background text-foreground",
        descriptionClassName: "text-muted-foreground",
      }}
    />
  )
}

