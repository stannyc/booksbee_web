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
  <BbPageShell app-name="Backoffice">
    <template #actions>
      <span class="mr-3 text-sm text-ink-500">{{ session.user?.roles.join(', ') }}</span>
      <BbButton variant="ghost" @click="signOut">Keluar</BbButton>
    </template>
    <h1 class="mb-6 text-2xl font-bold">Dasbor</h1>
    <div class="grid gap-4 md:grid-cols-3">
      <BbCard title="Antrean review soal"><p class="text-ink-500">Segera hadir.</p></BbCard>
      <BbCard title="Sekolah, grup &amp; pengguna"
        ><p class="text-ink-500">Segera hadir.</p></BbCard
      >
      <BbCard title="Metrik pilot"><p class="text-ink-500">Segera hadir.</p></BbCard>
    </div>
  </BbPageShell>
</template>
