import type { Middleware } from 'openapi-fetch'

// ❓ Not in the contract yet: cookie/header names for double-submit CSRF. Keep in sync with the api.
export const DEFAULT_CSRF_COOKIE = 'bb_csrf'
export const DEFAULT_CSRF_HEADER = 'X-CSRF-Token'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export interface CsrfOptions {
  cookieName?: string
  headerName?: string
  /** Defaults to `document.cookie`; injectable for tests. */
  getCookies?: () => string
}

export function readCookie(cookies: string, name: string): string | undefined {
  for (const part of cookies.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return undefined
}

/**
 * Double-submit CSRF: the session cookie is HttpOnly (unreadable here); the server also sets a
 * readable CSRF cookie whose value we echo in a header on every unsafe request.
 */
export function csrfMiddleware(options: CsrfOptions = {}): Middleware {
  const cookieName = options.cookieName ?? DEFAULT_CSRF_COOKIE
  const headerName = options.headerName ?? DEFAULT_CSRF_HEADER
  const getCookies = options.getCookies ?? (() => document.cookie)

  return {
    onRequest({ request }) {
      if (SAFE_METHODS.has(request.method.toUpperCase())) return request
      const token = readCookie(getCookies(), cookieName)
      if (token) request.headers.set(headerName, token)
      return request
    },
  }
}
