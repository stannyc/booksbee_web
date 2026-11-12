<script setup lang="ts">
import { BbCard } from '@booksbee/ui'
import { defineAsyncComponent } from 'vue'

// Placeholder for QR login (AUTH-1/2). Real flow:
// POST /auth/qr-login → render qr_payload as QR (~60s, auto-refresh) → wait on SSE
// /auth/qr-login/{id}/events → on `approved` the API sets the HttpOnly cookie → session.refresh().
const DevSignIn = import.meta.env.DEV
  ? defineAsyncComponent(() => import('../dev/DevSignIn.vue'))
  : null
</script>

<template>
  <main class="mx-auto max-w-md px-6 py-16">
    <BbCard title="Masuk ke BooksBee Portal">
      <div
        class="mx-auto mb-6 flex size-56 items-center justify-center rounded-card border-2 border-dashed border-ink-300 text-center text-sm text-ink-500"
        data-testid="qr-placeholder"
      >
        Kode QR akan muncul di sini
      </div>
      <ol class="mb-6 list-decimal space-y-1 pl-5 text-ink-700">
        <li>Buka aplikasi BooksBee untuk orang tua/guru di ponsel Anda.</li>
        <li>Pilih <strong>Pindai QR portal</strong> dan arahkan kamera ke kode ini.</li>
        <li>Periksa detail browser, lalu ketuk <strong>Setujui</strong>.</li>
      </ol>
      <component :is="DevSignIn" v-if="DevSignIn" />
    </BbCard>
  </main>
</template>
