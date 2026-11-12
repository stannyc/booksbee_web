import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export interface SessionUser<Role extends string = string> {
  id: string
  display_name: string
  roles: Role[]
}

export type SessionStatus = 'unknown' | 'anonymous' | 'authenticated'

export interface SessionStoreOptions<Role extends string> {
  /** Loads the current session from the server (cookie sent automatically); `null` = signed out. */
  fetchSession: () => Promise<SessionUser<Role> | null>
  /** Ends the server session (clears the HttpOnly cookie). */
  endSession?: () => Promise<void>
}

/**
 * Creates a Pinia session store. The session itself lives in an HttpOnly cookie, so the store
 * only mirrors who is signed in — it never holds tokens.
 */
export function createSessionStore<Role extends string>(
  id: string,
  options: SessionStoreOptions<Role>,
) {
  return defineStore(id, () => {
    const user = shallowRef<SessionUser<Role> | null>(null)
    const status = ref<SessionStatus>('unknown')

    const isAuthenticated = computed(() => status.value === 'authenticated')

    function hasAnyRole(roles: readonly Role[]): boolean {
      return roles.length === 0 || roles.some((r) => user.value?.roles.includes(r) ?? false)
    }

    function setUser(next: SessionUser<Role> | null) {
      user.value = next
      status.value = next ? 'authenticated' : 'anonymous'
    }

    async function refresh() {
      try {
        setUser(await options.fetchSession())
      } catch {
        setUser(null)
      }
    }

    async function ensureLoaded() {
      if (status.value === 'unknown') await refresh()
    }

    async function signOut() {
      await options.endSession?.()
      setUser(null)
    }

    return { user, status, isAuthenticated, hasAnyRole, setUser, refresh, ensureLoaded, signOut }
  })
}
