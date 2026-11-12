import { describe, expect, it, vi } from 'vitest'
import { createApiClient } from './client'

describe('createApiClient', () => {
  it('sends credentials and runs middleware', async () => {
    const fetch = vi.fn<(req: Request) => Promise<Response>>(async () => Response.json([]))
    const client = createApiClient({
      baseUrl: 'http://api.test/v1',
      fetch: fetch as unknown as typeof globalThis.fetch,
      middleware: [
        {
          onRequest({ request }) {
            request.headers.set('X-Test', 'yes')
            return request
          },
        },
      ],
    })

    const { data } = await client.GET('/children')

    expect(data).toEqual([])
    const req = fetch.mock.calls[0]![0]
    expect(req.url).toBe('http://api.test/v1/children')
    expect(req.credentials).toBe('include')
    expect(req.headers.get('X-Test')).toBe('yes')
  })
})
