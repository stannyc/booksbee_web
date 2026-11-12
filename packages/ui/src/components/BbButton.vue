<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<PrimitiveProps & { variant?: 'primary' | 'secondary' | 'ghost' }>(),
  { as: 'button', variant: 'primary' },
)

const variantClass = computed(
  () =>
    ({
      primary: 'bg-honey-500 text-ink-900 hover:bg-honey-600',
      secondary: 'bg-white text-ink-900 ring-1 ring-ink-300 hover:bg-ink-100',
      ghost: 'text-ink-700 hover:bg-ink-100',
    })[props.variant],
)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-500 disabled:cursor-not-allowed disabled:opacity-50"
    :class="variantClass"
  >
    <slot />
  </Primitive>
</template>
