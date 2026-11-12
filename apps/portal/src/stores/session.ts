import { createSessionStore } from '@booksbee/auth'

/** Portal users are parents and teachers (ACC-1); staff never sign in here (ACC-4). */
export type PortalRole = 'parent' | 'teacher'

export const useSession = createSessionStore<PortalRole>('portal-session', {
  // ❓ No "current session" endpoint in the contract yet — treat everyone as signed out.
  fetchSession: async () => null,
})
