"use client"

import { cn } from "@/lib/utils"
import {
  Scissors,
  Hammer,
  Car,
  BrushCleaning,
  ShoppingCart,
  Wrench,
  CookingPot,
  ClipboardList,
} from "lucide-react"

export type Category = {
  id: string
  label: string
  icon: React.ElementType
}

const defaultCategories: Category[] = [
  { id: "Penjahit", label: "Penjahit", icon: Scissors },
  { id: "Tukang", label: "Tukang", icon: Hammer },
  { id: "Supir", label: "Supir", icon: Car },
  { id: "Housekeeping", label: "Housekeeper", icon: BrushCleaning },
  { id: "Pedagang", label: "Pedagang", icon: ShoppingCart },
  { id: "Teknisi", label: "Teknisi", icon: Wrench },
  { id: "Pemasak", label: "Pemasak", icon: CookingPot },
  { id: "Admin", label: "Admin", icon: ClipboardList },
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
          const Icon = c.icon
          return (
            <button
              key={c.id}
              onClick={() => onChange?.(active ? null : c.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border bg-card px-4 py-6 text-center transition-all",
                "bg-primary/20 hover:bg-primary/30 hover:shadow-sm",
                active && "border-primary bg-primary/10 shadow-md"
              )}
              aria-pressed={active}
            >
              <Icon className={cn("h-10 w-10 text-primary")} />
              <div className="mt-3 font-medium">{c.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
