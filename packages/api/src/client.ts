import createClient, { type Middleware } from 'openapi-fetch'
import type { paths } from './gen/schema'

export interface ApiClientOptions {
  /** e.g. `/v1` (proxied in dev) or `https://api.booksbee.id/v1`. */
  baseUrl: string
  /** Extra middleware, e.g. CSRF from `@booksbee/auth`. */
  middleware?: Middleware[]
  fetch?: typeof globalThis.fetch
}

export type ApiClient = ReturnType<typeof createClient<paths>>

/**
 * Thin typed client over the hub contract. Sessions are HttpOnly cookies, so every request
 * sends credentials; no tokens are stored in JS.
 */
export function createApiClient(options: ApiClientOptions): ApiClient {
  const client = createClient<paths>({
    baseUrl: options.baseUrl,
    credentials: 'include',
    ...(options.fetch ? { fetch: options.fetch } : {}),
  })
  for (const mw of options.middleware ?? []) client.use(mw)
  return client
}
