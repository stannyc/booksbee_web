import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BbButton from './BbButton.vue'

describe('BbButton', () => {
  it('renders a button with the primary variant by default', () => {
    const wrapper = mount(BbButton, { slots: { default: 'Masuk' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Masuk')
    expect(wrapper.classes()).toContain('bg-honey-500')
  })

  it('can render as a link', () => {
    const wrapper = mount(BbButton, { props: { as: 'a', variant: 'ghost' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('text-ink-700')
  })
})
