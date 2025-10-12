export type Job = {
  id: string
  title: string
  location: string
  pay: string
  category: string
  employer: string
  image: string
  status: string
  uid: string
  postedDate: string
  requirements?: {
    skills?: string[]
    experience?: string
    uid?: string 
  }
}


export type Course = {
    id: string
    title: string
    category: string
    duration: string
    level: string
    image: string
    description: string
  }
  
  