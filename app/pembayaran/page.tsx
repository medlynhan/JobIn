"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Payment = { id: string; jobTitle: string; amount: string; status: "pending" | "paid" }

export default function PaymentsPage() {
  const [items, setItems] = useState<Payment[]>([
    { id: "p1", jobTitle: "Bersih Kantor", amount: "Rp85rb", status: "pending" },
    { id: "p2", jobTitle: "Kasir Toko", amount: "Rp90rb", status: "paid" },
  ])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const pay = async (id: string) => {
    setLoadingId(id)
    await fetch("/api/payments/checkout", { method: "POST", body: JSON.stringify({ paymentId: id }) })
    setItems((arr) => arr.map((p) => (p.id === id ? { ...p, status: "paid" } : p)))
    setLoadingId(null)
  }

  return (
    <main className="px-8 lg:px-12 py-24 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
      <div className="grid gap-4">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.jobTitle}</div>
              <div className="text-sm text-gray-600">{p.amount}</div>
            </div>
            {p.status === "pending" ? (
              <Button onClick={() => pay(p.id)} disabled={loadingId === p.id}>
                {loadingId === p.id ? "Memproses..." : "Bayar"}
              </Button>
            ) : (
              <span className="text-green-600 font-semibold">Lunas</span>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
