"use client"
import { cn } from "@/lib/utils"

export type Level = {
  id: string
  label: string
  emoji: string
}

const defaultLevels: Level[] = [
  { id: "Pemula", label: "Pemula", emoji: "🌱" },
  { id: "Menengah", label: "Menengah", emoji: "⚙️" },
  { id: "Lanjutan", label: "Lanjutan", emoji: "🚀" },
]

type Props = {
  value?: string | null
  onChange?: (level: string | null) => void
  levels?: Level[]
}

export function LevelGrid({ value, onChange, levels = defaultLevels }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold md:text-2xl">Tingkat Kesulitan</h3>
      <div
        className="
          mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4
          md:grid-cols-3 lg:grid-cols-3
        "
      >
        {levels.map((lvl) => {
          const active = value === lvl.id
          return (
            <button
              key={lvl.id}
              onClick={() => onChange?.(active ? null : lvl.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl border bg-card px-8 py-8 text-center transition-all",
                "hover:bg-accent hover:shadow-sm",
                active && "border-ring bg-accent shadow-md"
              )}
              aria-pressed={active}
            >
              <div className="text-4xl">{lvl.emoji}</div>
              <div className="mt-3 font-medium text-lg">{lvl.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
