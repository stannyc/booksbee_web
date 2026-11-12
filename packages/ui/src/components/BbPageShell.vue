<script setup lang="ts">
defineProps<{ appName: string }>()
</script>

<template>
  <div class="min-h-dvh">
    <header class="flex items-center justify-between border-b border-ink-100 bg-white px-6 py-3">
      <div class="flex items-center gap-2 font-bold">
        <span aria-hidden="true" class="size-6 rounded-full bg-honey-500" />
        <span>BooksBee</span>
        <span class="font-normal text-ink-500">· {{ appName }}</span>
      </div>
      <slot name="actions" />
    </header>
    <main class="mx-auto max-w-5xl px-6 py-8">
      <slot />
    </main>
  </div>
</template>
