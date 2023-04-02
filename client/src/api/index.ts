const baseUrl = import.meta.env.VITE_API_HOSTED_URL || 'http://localhost:3000'
export const apiBaseUrl = new URL(`${baseUrl}/api/v1/`)
