<script setup lang="ts">
import { BbButton, BbCard, BbPageShell } from '@booksbee/ui'
import { useRouter } from 'vue-router'
import { useSession } from '../stores/session'

const session = useSession()
const router = useRouter()

async function signOut() {
  await session.signOut()
  await router.push({ name: 'login' })
}
</script>

<template>
  <BbPageShell app-name="Portal">
    <template #actions>
      <BbButton variant="ghost" @click="signOut">Keluar</BbButton>
    </template>
    <h1 class="mb-6 text-2xl font-bold">Halo, {{ session.user?.display_name }}</h1>
    <BbCard title="Soal saya">
      <p class="text-ink-500">Belum ada soal. Fitur penulisan soal akan segera hadir.</p>
    </BbCard>
  </BbPageShell>
</template>
