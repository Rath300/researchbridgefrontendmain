export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          school: string | null
          grade: string | null
          location: string | null
          interests: string[] | null
          skills: string[] | null
          availability: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          school?: string | null
          grade?: string | null
          location?: string | null
          interests?: string[] | null
          skills?: string[] | null
          availability?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          school?: string | null
          grade?: string | null
          location?: string | null
          interests?: string[] | null
          skills?: string[] | null
          availability?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string[] | null
          status: string | null
          progress: number | null
          created_at: string
          updated_at: string
          timestamp_proof: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string[] | null
          status?: string | null
          progress?: number | null
          created_at?: string
          updated_at?: string
          timestamp_proof?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string[] | null
          status?: string | null
          progress?: number | null
          created_at?: string
          updated_at?: string
          timestamp_proof?: string | null
        }
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          role?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          role?: string | null
          joined_at?: string
        }
      }
      project_documents: {
        Row: {
          id: string
          project_id: string
          title: string
          type: string | null
          content: string | null
          created_by: string | null
          created_at: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          type?: string | null
          content?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          type?: string | null
          content?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      guilds: {
        Row: {
          id: string
          name: string
          logo: string | null
          description: string | null
          categories: string[] | null
          ranking: number | null
          score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo?: string | null
          description?: string | null
          categories?: string[] | null
          ranking?: number | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string | null
          description?: string | null
          categories?: string[] | null
          ranking?: number | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      guild_members: {
        Row: {
          id: string
          guild_id: string
          user_id: string
          role: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          guild_id: string
          user_id: string
          role?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          guild_id?: string
          user_id?: string
          role?: string | null
          joined_at?: string
        }
      }
      guild_projects: {
        Row: {
          id: string
          guild_id: string
          project_id: string
          added_at: string
        }
        Insert: {
          id?: string
          guild_id: string
          project_id: string
          added_at?: string
        }
        Update: {
          id?: string
          guild_id?: string
          project_id?: string
          added_at?: string
        }
      }
      mentors: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          title: string | null
          institution: string | null
          specialties: string[] | null
          bio: string | null
          availability: string | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          title?: string | null
          institution?: string | null
          specialties?: string[] | null
          bio?: string | null
          availability?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          title?: string | null
          institution?: string | null
          specialties?: string[] | null
          bio?: string | null
          availability?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      mentor_reviews: {
        Row: {
          id: string
          mentor_id: string
          user_id: string
          rating: number | null
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          mentor_id: string
          user_id: string
          rating?: number | null
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          mentor_id?: string
          user_id?: string
          rating?: number | null
          comment?: string | null
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          last_message_id: string | null
          type: string | null
          name: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          last_message_id?: string | null
          type?: string | null
          name?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          last_message_id?: string | null
          type?: string | null
          name?: string | null
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string | null
          created_at: string
          read: boolean | null
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content?: string | null
          created_at?: string
          read?: boolean | null
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string | null
          created_at?: string
          read?: boolean | null
        }
      }
      research_ideas: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
          timestamp_proof: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          timestamp_proof?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          timestamp_proof?: string | null
        }
      }
      collaborator_matches: {
        Row: {
          id: string
          user_id: string
          matched_user_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          matched_user_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          matched_user_id?: string
          status?: string
          created_at?: string
        }
      }
      mentorship_requests: {
        Row: {
          id: string
          student_id: string
          mentor_id: string
          project_description: string | null
          goals: string | null
          duration: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          mentor_id: string
          project_description?: string | null
          goals?: string | null
          duration?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          mentor_id?: string
          project_description?: string | null
          goals?: string | null
          duration?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      research_articles: {
        Row: {
          id: string
          title: string
          abstract: string | null
          content: string | null
          user_id: string
          tags: string[] | null
          status: string
          likes: number | null
          published_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          abstract?: string | null
          content?: string | null
          user_id: string
          tags?: string[] | null
          status?: string
          likes?: number | null
          published_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          abstract?: string | null
          content?: string | null
          user_id?: string
          tags?: string[] | null
          status?: string
          likes?: number | null
          published_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      article_comments: {
        Row: {
          id: string
          article_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

