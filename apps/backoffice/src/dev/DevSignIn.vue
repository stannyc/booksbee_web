<script setup lang="ts">
// Dev-only shortcut past the login placeholder. Loaded only when import.meta.env.DEV,
// so it is never part of a production build.
import { BbButton } from '@booksbee/ui'
import { useRoute, useRouter } from 'vue-router'
import { useSession } from '../stores/session'

const session = useSession()
const route = useRoute()
const router = useRouter()

async function signIn() {
  session.setUser({ id: 'dev-admin', display_name: 'Staf Contoh', roles: ['admin'] })
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  await router.push(redirect)
}
</script>

<template>
  <BbButton class="mt-4" variant="secondary" @click="signIn"
    >Masuk sebagai admin (khusus dev)</BbButton
  >
</template>
