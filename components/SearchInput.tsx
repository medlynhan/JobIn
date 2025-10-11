"use client"
import { Search, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = "Cari pekerjaan..." }: Props) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-5 w-5" aria-hidden />
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl pl-10 pr-12"
        aria-label="Cari pekerjaan"
      />
      <button
        type="button"
        aria-label="Voice search (coming soon)"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent"
      >
        <Mic className="h-5 w-5" />
      </button>
    </div>
  )
}
