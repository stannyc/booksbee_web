import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { router } from '../router'
import App from '../App.vue'

describe('portal routing', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('sends signed-out users to the QR login placeholder', async () => {
    await router.push('/')
    const wrapper = mount(App, { global: { plugins: [router] } })
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('login')
    expect(wrapper.find('[data-testid="qr-placeholder"]').exists()).toBe(true)
  })
})
