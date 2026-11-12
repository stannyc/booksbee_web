import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App.vue'
import { router } from './router'
import { useSession } from './stores/session'

describe('backoffice routing', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('sends signed-out users to the staff login', async () => {
    await router.push('/')
    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('[data-testid="staff-login"]').exists()).toBe(true)
  })

  it('lets a staff member with a role into the dashboard', async () => {
    const session = useSession()
    session.setUser({ id: 's1', display_name: 'Rina', roles: ['reviewer'] })
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('dashboard')
  })
})
