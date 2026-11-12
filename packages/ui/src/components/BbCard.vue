<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <section class="rounded-card bg-white p-6 shadow-sm ring-1 ring-ink-100">
    <h2 v-if="title" class="mb-4 text-lg font-bold text-ink-900">{{ title }}</h2>
    <slot />
  </section>
</template>
