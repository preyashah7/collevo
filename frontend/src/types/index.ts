export interface College {
  id: string
  name: string
  slug: string
  city: string
  state: string
  type: 'government' | 'private' | 'deemed' | 'autonomous'
  established_year: number | null
  campus_size_acres: number | null
  total_students: number | null
  total_faculty: number | null
  logo_url: string | null
  banner_url: string | null
  website: string | null
  naac_grade: string | null
  approvals: string[]
  overall_rating: number | null
  total_reviews: number
  placement_avg_package_lpa: number | null
  placement_highest_package_cr: number | null
  placement_percent: number | null
  placement_companies_count: number | null
  nirf_ranking: number | null
  min_fees_per_year: number | null
  description: string | null
  is_featured: boolean
}

export interface Course {
  id: string
  college_id: string
  name: string
  degree_type: string
  degree_level: string
  stream: string
  specialization: string | null
  duration_years: number
  program_type: string
  total_fees: number | null
  fees_per_year: number | null
  eligibility: string | null
  median_salary_lpa: number | null
  total_seats: number | null
  application_open_date: string | null
  application_close_date: string | null
  exams: string[]
}

export interface Review {
  id: string
  college_id: string
  reviewer_name: string
  course_studied: string | null
  batch_year: number | null
  overall_rating: number
  academics_rating: number | null
  faculty_rating: number | null
  campus_rating: number | null
  placement_rating: number | null
  infrastructure_rating: number | null
  what_i_liked: string[]
  what_i_didnt_like: string[]
  placement_experience: string | null
  body_text: string | null
  is_verified: boolean
  created_at: string
}

export interface Placement {
  id: string
  college_id: string
  year: number
  avg_package_lpa: number | null
  highest_package_cr: number | null
  students_placed: number | null
  placement_percent: number | null
  companies_count: number | null
  top_recruiters: string[]
}

export interface CollegeFilters {
  stream?: string
  state?: string
  city?: string
  type?: string
  fees_max?: number
  exam?: string
  rating_min?: number
  sort?: string
  page?: number
  limit?: number
  search?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
