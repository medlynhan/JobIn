import { ref, get } from "firebase/database"
import { database } from "@/lib/firebase"
import { notFound } from "next/navigation"
import { CourseDetailClient } from "./CourseDetailClient"

type Props = {
  params: Promise<{ id: string }>
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params

  const courseRef = ref(database, `classes/${id}`)
  const snapshot = await get(courseRef)

  if (!snapshot.exists()) notFound()

  const course = snapshot.val()

  return <CourseDetailClient course={course} />
}
