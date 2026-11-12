import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { installSessionGuard } from './guard'
import { createSessionStore, type SessionUser } from './session'

type Role = 'reviewer' | 'admin'
const Empty = { render: () => null }

function setup(user: SessionUser<Role> | null) {
  const useSession = createSessionStore<Role>(`test-${Math.random()}`, {
    fetchSession: async () => user,
  })
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/login', name: 'login', component: Empty, meta: { guestOnly: true } },
      { path: '/', name: 'home', component: Empty, meta: { requiresAuth: true } },
      {
        path: '/admin',
        name: 'admin',
        component: Empty,
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      { path: '/forbidden', name: 'forbidden', component: Empty },
    ],
  })
  installSessionGuard(router, {
    useSession,
    loginRouteName: 'login',
    homeRouteName: 'home',
    forbiddenRouteName: 'forbidden',
  })
  return router
}

const reviewer: SessionUser<Role> = { id: 'u1', display_name: 'Rina', roles: ['reviewer'] }

describe('installSessionGuard', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('sends signed-out users to login with a redirect', async () => {
    const router = setup(null)
    await router.push('/admin')
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/admin')
  })

  it('blocks users without the route role', async () => {
    const router = setup(reviewer)
    await router.push('/admin')
    expect(router.currentRoute.value.name).toBe('forbidden')
  })

  it('lets signed-in users through and away from login', async () => {
    const router = setup(reviewer)
    await router.push('/login')
    expect(router.currentRoute.value.name).toBe('home')
  })
})
