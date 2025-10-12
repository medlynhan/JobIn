"use client"

import { cn } from "@/lib/utils"
import { Sprout, Settings, Rocket } from "lucide-react"

export type Level = {
  id: string
  label: string
  icon: React.ElementType
}

const defaultLevels: Level[] = [
  { id: "Pemula", label: "Pemula", icon: Sprout },
  { id: "Menengah", label: "Menengah", icon: Settings },
  { id: "Lanjutan", label: "Lanjutan", icon: Rocket },
]

type Props = {
  value?: string | null
  onChange?: (level: string | null) => void
  levels?: Level[]
}

export function LevelGrid({ value, onChange, levels = defaultLevels }: Props) {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold md:text-2xl">Tingkat Kesulitan</h3>
      <div
        className="
          mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4
          md:grid-cols-3 lg:grid-cols-3
        "
      >
        {levels.map((lvl) => {
          const active = value === lvl.id
          const Icon = lvl.icon
          return (
            <button
              key={lvl.id}
              onClick={() => onChange?.(active ? null : lvl.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border bg-card px-8 py-8 text-center transition-all",
                "bg-primary/20 hover:bg-primary/30  hover:shadow-sm",
                active && "border-primary bg-primary/10 shadow-md"
              )}
              aria-pressed={active}
            >
              <Icon className={cn("h-10 w-10 text-primary")} />
              <div className="mt-3 font-medium text-lg">{lvl.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
