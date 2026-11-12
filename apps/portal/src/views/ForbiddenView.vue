<script setup lang="ts">
import { BbButton, BbCard } from '@booksbee/ui'
</script>

<template>
  <main class="mx-auto max-w-md px-6 py-16">
    <BbCard title="Akses ditolak">
      <p class="mb-4 text-ink-700">Akun Anda tidak memiliki izin untuk halaman ini.</p>
      <BbButton as-child variant="secondary"><RouterLink to="/">Kembali</RouterLink></BbButton>
    </BbCard>
  </main>
</template>
