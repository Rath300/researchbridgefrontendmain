// This file defines the database schema for the ResearchNexus platform

// User profile schema
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  school: string
  grade: string
  location: string
  bio: string
  interests: string[]
  skills: string[]
  availability: string
  projects: string[] // References to Project IDs
  guilds: string[] // References to Guild IDs
  mentors: string[] // References to Mentor IDs
  collaborators: string[] // References to User IDs
  createdAt: Date
  updatedAt: Date
}

// Research project schema
export interface Project {
  id: string
  title: string
  description: string
  category: string[]
  status: "Planning" | "In Progress" | "Data Collection" | "Analysis" | "Writing" | "Completed"
  progress: number // 0-100
  members: {
    userId: string
    role: "Leader" | "Contributor" | "Advisor"
    joinedAt: Date
  }[]
  guild?: string // Optional reference to Guild ID
  documents: {
    id: string
    title: string
    type: "Abstract" | "Proposal" | "Data" | "Analysis" | "Paper" | "Presentation"
    url: string
    createdAt: Date
    updatedAt: Date
  }[]
  timeline: {
    milestone: string
    dueDate: Date
    completed: boolean
  }[]
  createdAt: Date
  updatedAt: Date
  timestampProof?: string // Hash for proof of ownership
}

// Research guild schema
export interface Guild {
  id: string
  name: string
  logo?: string
  description: string
  categories: string[]
  members: {
    userId: string
    role: "Leader" | "Moderator" | "Member"
    joinedAt: Date
  }[]
  projects: string[] // References to Project IDs
  ranking: number
  score: number // Calculated based on project activity, completions, etc.
  createdAt: Date
  updatedAt: Date
}

// Mentor profile schema
export interface Mentor {
  id: string
  name: string
  email: string
  avatar?: string
  title: string
  institution: string
  specialties: string[]
  bio: string
  availability: string
  students: {
    userId: string
    status: "Pending" | "Active" | "Completed"
    startDate?: Date
    endDate?: Date
  }[]
  rating: number
  reviews: {
    userId: string
    rating: number
    comment: string
    date: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

// Research article schema
export interface Article {
  id: string
  title: string
  abstract: string
  content: string
  authors: {
    userId: string
    role: "Primary" | "Secondary" | "Contributor"
  }[]
  tags: string[]
  status: "Draft" | "Published" | "Featured"
  likes: number
  comments: {
    userId: string
    content: string
    date: Date
  }[]
  publishedDate?: Date
  createdAt: Date
  updatedAt: Date
  timestampProof?: string // Hash for proof of ownership
}

// Message schema
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: Date
}

// Collaboration request schema
export interface CollaborationRequest {
  id: string
  senderId: string
  receiverId: string
  projectId?: string
  message: string
  status: "Pending" | "Accepted" | "Rejected"
  createdAt: Date
  updatedAt: Date
}

// Mentorship request schema
export interface MentorshipRequest {
  id: string
  studentId: string
  mentorId: string
  projectDescription: string
  goals: string
  duration: string
  status: "Pending" | "Accepted" | "Rejected"
  createdAt: Date
  updatedAt: Date
}

