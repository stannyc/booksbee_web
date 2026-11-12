import { createApiClient } from '@booksbee/api'
import { csrfMiddleware } from '@booksbee/auth'

export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/v1',
  middleware: [csrfMiddleware()],
})
