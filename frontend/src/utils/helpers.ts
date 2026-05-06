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
