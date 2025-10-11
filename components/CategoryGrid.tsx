"use client"
import { cn } from "@/lib/utils"

export type Category = {
  id: string
  label: string
  emoji: string
}

const defaultCategories: Category[] = [
  { id: "Penjahit", label: "Penjahit", emoji: "✂️" },
  { id: "Tukang", label: "Tukang", emoji: "🔨" },
  { id: "Supir", label: "Supir", emoji: "🚗" },
  { id: "Housekeeping", label: "Housekeeper", emoji: "🧹" },
  { id: "Pedagang", label: "Pedagang", emoji: "🛒" },
  { id: "Teknisi", label: "Teknisi", emoji: "🛠️" },       // changed from "cleaning"
  { id: "Pemasak", label: "Pemasak", emoji: "👩‍🍳" },     // changed from "tukang-kebun"
  { id: "Admin", label: "Admin", emoji: "📋" },
]

type Props = {
  value?: string | null
  onChange?: (cat: string | null) => void
  categories?: Category[]
}

export function CategoryGrid({ value, onChange, categories = defaultCategories }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold md:text-2xl">Kategori Pekerjaan</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((c) => {
          const active = value === c.id
          return (
            <button
              key={c.id}
              onClick={() => onChange?.(active ? null : c.id)}
              className={cn(
                "rounded-2xl border bg-card px-4 py-6 text-center transition-colors",
                "hover:bg-accent",
                active && "border-ring bg-accent",
              )}
              aria-pressed={active}
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-3 font-medium">{c.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
