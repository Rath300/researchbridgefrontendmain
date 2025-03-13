"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { Loader2 } from "lucide-react"

interface ImageUploadProps {
  onUpload: (url: string) => void
  defaultImage?: string
  className?: string
}

export function ImageUpload({ onUpload, defaultImage, className }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const url = await uploadToCloudinary(file)

      setImage(url)
      onUpload(url)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setImage(null)
    onUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {image ? (
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt="Uploaded image"
            width={200}
            height={200}
            className="rounded-md object-cover"
          />
          <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-8 w-full max-w-xs">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground text-center mb-2">Drag and drop an image, or click to browse</p>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
      )}
      <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
    </div>
  )
}

