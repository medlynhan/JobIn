export type Job = {
  id: string;
  title: string;
  location: string;
  pay: string;
  image: string;
  }
  
  export const JOBS: Job[] = [
    {
      id: "1",
      title: "Pekerja Bangunan",
      location: "Jakarta Selatan",
      pay: "Rp 150,000 - 200,000/hari",
      image: "/construction-job.png",
    },
    {
      id: "2",
      title: "Supir Online",
      location: "Jakarta Tengah",
      pay: "Rp 100,000 - 250,000/hari",
      image: "/driver-job.png",
    },
    {
      id: "3",
      title: "Penjahit",
      location: "Jakarta Timur",
      pay: "Rp 120,000 - 180,000/hari",
      image: "/tailor-job.png",
    },
    {
      id: "4",
      title: "Asisten Rumah Tangga",
      location: "Jakarta Barat",
      pay: "Rp 80,000 - 150,000/hari",
      image: "/housekeeper-job.png",
    },
    {
      id: "5",
      title: "Pedagang Kaki Lima",
      location: "Jakarta Utara",
      pay: "Rp 100,000 - 300,000/hari",
      image: "/vendor-job.png",
    },
  ]
  
  export async function fetcher(url: string) {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  }
  