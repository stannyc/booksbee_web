import { createSessionStore } from '@booksbee/auth'

/** Staff roles (ACC-4). Permissions come from roles, checked by the API on every /admin call. */
export type StaffRole = 'reviewer' | 'finance' | 'admin'

export const ALL_STAFF_ROLES: readonly StaffRole[] = ['reviewer', 'finance', 'admin']

export const useSession = createSessionStore<StaffRole>('backoffice-session', {
  // ❓ No /admin/me endpoint in the contract yet — treat everyone as signed out.
  fetchSession: async () => null,
})
