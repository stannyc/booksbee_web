<script setup lang="ts">
import { BbButton, BbCard } from '@booksbee/ui'
import { defineAsyncComponent, ref } from 'vue'

// Placeholder for staff login with 2FA (ACC-4): email + password, then a TOTP code.
// Endpoints (/admin/auth/...) are not in the contract yet.
const DevSignIn = import.meta.env.DEV
  ? defineAsyncComponent(() => import('../dev/DevSignIn.vue'))
  : null

const email = ref('')
const password = ref('')
const code = ref('')
</script>

<template>
  <main class="mx-auto max-w-md px-6 py-16">
    <BbCard title="Masuk staf BooksBee">
      <form class="space-y-4" data-testid="staff-login" @submit.prevent>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold">Email</span>
          <input
            v-model="email"
            type="email"
            autocomplete="username"
            disabled
            class="w-full rounded-lg border border-ink-300 px-3 py-2"
          />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold">Kata sandi</span>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            disabled
            class="w-full rounded-lg border border-ink-300 px-3 py-2"
          />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold">Kode verifikasi (2FA)</span>
          <input
            v-model="code"
            inputmode="numeric"
            autocomplete="one-time-code"
            disabled
            class="w-full rounded-lg border border-ink-300 px-3 py-2"
          />
        </label>
        <BbButton type="submit" disabled>Masuk</BbButton>
        <p class="text-sm text-ink-500">Login staf belum tersedia.</p>
      </form>
      <component :is="DevSignIn" v-if="DevSignIn" />
    </BbCard>
  </main>
</template>
