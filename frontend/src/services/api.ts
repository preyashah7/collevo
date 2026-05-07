import axios from 'axios'
import type { ApiResponse, College, CollegeFilters, Course, Placement, Review } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
	baseURL: BASE_URL
})

// Add auth interceptor
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('collevo_token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
)

export interface RegisterData {
	name: string
	email: string
	password: string
	phone?: string
	stream_preference?: string
	city?: string
}

export interface User {
	id: string
	name: string
	email: string
	phone: string | null
	stream_preference: string | null
	city: string | null
}

export const authApi = {
	register: (data: RegisterData) =>
		api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', data),
	login: (email: string, password: string) =>
		api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password }),
	me: (token: string) =>
		api.get<ApiResponse<User>>('/auth/me', {
			headers: { Authorization: `Bearer ${token}` }
		}),
	logout: () => api.post<ApiResponse<null>>('/auth/logout')
}

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
	getAll: () => api.get<ApiResponse<College[]>>('/saved'),
	save: (collegeId: string) => api.post<ApiResponse<null>>('/saved', { college_id: collegeId }),
	remove: (collegeId: string) => api.delete<ApiResponse<null>>(`/saved/${collegeId}`)
}

export default api
