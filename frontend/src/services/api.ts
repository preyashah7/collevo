import axios from 'axios'
import type { ApiResponse, College, CollegeFilters, Course, Placement, Review } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
	baseURL: BASE_URL
})

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
)

export const collegeApi = {
	getAll: (filters: CollegeFilters = {}) => {
		const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== ''))
		return api.get<ApiResponse<College[]>>('/colleges', { params })
	},
	getBySlug: (slug: string) => api.get<ApiResponse<College>>(`/colleges/${slug}`),
	getCourses: (slug: string) => api.get<ApiResponse<Course[]>>(`/colleges/${slug}/courses`),
	getReviews: (slug: string) => api.get<ApiResponse<Review[]>>(`/colleges/${slug}/reviews`),
	getPlacements: (slug: string) => api.get<ApiResponse<Placement[]>>(`/colleges/${slug}/placements`),
	compare: (slugs: string[]) => api.post<ApiResponse<College[]>>('/colleges/compare', { slugs }),
	search: (query: string) => api.get<ApiResponse<College[]>>('/colleges', { params: { search: query, limit: 8 } })
}

export const savedApi = {
	getAll: (sessionId: string) => api.get<ApiResponse<College[]>>(`/saved/${sessionId}`),
	save: (sessionId: string, collegeId: string) =>
		api.post<ApiResponse<null>>('/saved', { session_id: sessionId, college_id: collegeId }),
	remove: (sessionId: string, collegeId: string) => api.delete<ApiResponse<null>>(`/saved/${sessionId}/${collegeId}`)
}

export default api
