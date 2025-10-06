export type Job = {
    id: string
    title: string
    category: string
    location: string
    distanceKm: number
    rate: string
    image: string
    postedMinutesAgo?: number
    employer: string
    description: string
  }
  
  export const JOBS: Job[] = [
    {
      id: "1",
      title: "Tukang Bangunan",
      category: "bangunan",
      location: "Ciputat",
      distanceKm: 2,
      rate: "Rp100rb/hari",
      image: "/job1.jpg",
      postedMinutesAgo: 15,
      employer: "Pak Darto",
      description: "Bantu renovasi tembok dan plesteran, 1-2 hari kerja.",
    },
    {
      id: "2",
      title: "Bersih Rumah",
      category: "kebersihan",
      location: "Pamulang",
      distanceKm: 3,
      rate: "Rp80rb/hari",
      image: "/job2.jpg",
      postedMinutesAgo: 30,
      employer: "Bu Sari",
      description: "Bersih-bersih harian, sapu, pel, cuci piring.",
    },
    {
      id: "3",
      title: "Kasir Toko",
      category: "ritel",
      location: "Bintaro",
      distanceKm: 1.5,
      rate: "Rp90rb/hari",
      image: "/job3.jpg",
      postedMinutesAgo: 5,
      employer: "Toko Maju",
      description: "Kasir shift pagi, ramah dan teliti.",
    },
    {
      id: "4",
      title: "Bersih Kantor",
      category: "kebersihan",
      location: "BSD",
      distanceKm: 4,
      rate: "Rp85rb/hari",
      image: "/job4.jpg",
      postedMinutesAgo: 10,
      employer: "Kantor Sejahtera",
      description: "Kebersihan umum area kantor kecil.",
    },
  ]
  
  export async function fetcher(url: string) {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  }
  