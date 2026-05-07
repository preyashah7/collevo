const asNumber = (value: number | string | null | undefined): number | null => {
	if (value === null || value === undefined || value === '') return null
	const parsed = typeof value === 'number' ? value : Number(value)
	return Number.isFinite(parsed) ? parsed : null
}

export const formatFees = (fees: number | string | null | undefined): string => {
	const numeric = asNumber(fees)
	if (numeric === null) return 'N/A'
	if (numeric >= 100000) return `₹${(numeric / 100000).toFixed(1)}L/yr`
	if (numeric >= 1000) return `₹${(numeric / 1000).toFixed(0)}K/yr`
	return `₹${numeric}/yr`
}

export const formatPackage = (lpa: number | string | null | undefined): string => {
	const numeric = asNumber(lpa)
	if (numeric === null) return 'N/A'
	return `₹${numeric.toFixed(1)} LPA`
}

export const formatRating = (rating: number | string | null | undefined): string => {
	const numeric = asNumber(rating)
	if (numeric === null) return 'N/A'
	return numeric.toFixed(1)
}

export const getInitials = (name: string): string => {
	return name
		.split(' ')
		.slice(0, 2)
		.map((word) => word[0])
		.join('')
		.toUpperCase()
}

export const getTypeColor = (type: string): string => {
	const colors: Record<string, string> = {
		government: 'bg-green-100 text-green-800',
		private: 'bg-blue-100 text-blue-800',
		deemed: 'bg-purple-100 text-purple-800',
		autonomous: 'bg-orange-100 text-orange-800'
	}
	return colors[type] || 'bg-gray-100 text-gray-800'
}

export const getSessionId = (): string => {
	let sessionId = localStorage.getItem('collevo_session')
	if (!sessionId) {
		sessionId = `sess_${Math.random().toString(36).slice(2, 11)}`
		localStorage.setItem('collevo_session', sessionId)
	}
	return sessionId
}

export const getPredictorLabel = (rank: number, closingRank: number): 'safe' | 'moderate' | 'reach' => {
	const ratio = rank / closingRank
	if (ratio <= 0.8) return 'safe'
	if (ratio <= 1.1) return 'moderate'
	return 'reach'
}

export interface CollegeForScore {
	overall_rating?: number | null
	placement_percent?: number | null
	placement_avg_package_lpa?: number | null
	nirf_ranking?: number | null
}

/**
 * Calculate Collevo Decision Score (0-100)
 * Proprietary scoring system based on:
 * - Placement % (30%)
 * - Rating (25%)
 * - NIRF Ranking (25%)
 * - Average Package (20%)
 */
export const calculateDecisionScore = (college: CollegeForScore): number => {
	let score = 0

	// Placement percentage (30%) - weight 0-100
	const placementScore = ((college.placement_percent || 0) / 100) * 100
	score += placementScore * 0.3

	// Overall rating (25%) - convert 0-5 scale to 0-100
	const ratingScore = ((college.overall_rating || 0) / 5) * 100
	score += ratingScore * 0.25

	// NIRF Ranking (25%) - lower is better, invert to 0-100 scale
	const rankingScore = college.nirf_ranking ? Math.max(0, 100 - college.nirf_ranking) : 0
	score += rankingScore * 0.25

	// Average Package (20%) - normalize to 0-100 (assuming max is 50 LPA)
	const packageScore = Math.min(100, ((college.placement_avg_package_lpa || 0) / 50) * 100)
	score += packageScore * 0.2

	return Math.round(Math.max(0, Math.min(100, score)))
}
