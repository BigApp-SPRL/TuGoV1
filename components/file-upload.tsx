"use client"

import { ChangeEvent, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface FileUploadProps {
  label: string
  onChange: (file: File | null) => void
  accept?: string
  required?: boolean
}

export function FileUpload({ label, onChange, accept, required }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFileName(file.name)
      onChange(file)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="file"
          accept={accept}
          required={required}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex items-center gap-2 p-2 border rounded-md bg-background">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm truncate">
            {fileName || "Choose file..."}
          </span>
        </div>
      </div>
    </div>
  )
}