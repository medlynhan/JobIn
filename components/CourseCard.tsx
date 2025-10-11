"use client"

import { Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/types"

interface CourseCardProps {
  course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {
  if (!course) return null

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex-shrink-0 w-full">
      <div className="relative overflow-hidden">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title || "Course image"}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.level && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {course.level}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full rounded-lg font-medium">Join Course</Button>
      </CardFooter>
    </Card>
  )
}

export default CourseCard
