import { describe, expect, it } from 'vitest'
import { csrfMiddleware, readCookie } from './csrf'

type OnRequest = NonNullable<ReturnType<typeof csrfMiddleware>['onRequest']>

async function run(method: string, cookies: string) {
  const mw = csrfMiddleware({ getCookies: () => cookies })
  const request = new Request('http://api.test/v1/questions', { method })
  const params = { request } as unknown as Parameters<OnRequest>[0]
  return (await mw.onRequest!(params)) as Request
}

describe('readCookie', () => {
  it('finds a cookie among others and decodes it', () => {
    expect(readCookie('a=1; bb_csrf=x%3Dy; b=2', 'bb_csrf')).toBe('x=y')
    expect(readCookie('a=1', 'bb_csrf')).toBeUndefined()
  })
})

describe('csrfMiddleware', () => {
  it('adds the token header on unsafe methods', async () => {
    const req = await run('POST', 'bb_csrf=tok')
    expect(req.headers.get('X-CSRF-Token')).toBe('tok')
  })

  it('leaves safe methods alone', async () => {
    const req = await run('GET', 'bb_csrf=tok')
    expect(req.headers.has('X-CSRF-Token')).toBe(false)
  })
})
