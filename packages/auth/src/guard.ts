import type { Router } from 'vue-router'

export interface SessionGuardOptions<Role extends string> {
  /** Returns the session store (called lazily, after Pinia is installed). */
  useSession: () => {
    ensureLoaded: () => Promise<void>
    isAuthenticated: boolean
    hasAnyRole: (roles: readonly Role[]) => boolean
  }
  loginRouteName: string
  homeRouteName: string
  /** Shown when signed in but missing the route's roles. */
  forbiddenRouteName: string
}

declare module 'vue-router' {
  interface RouteMeta {
    /** Route needs a signed-in session. */
    requiresAuth?: boolean
    /** Any of these roles grants access (empty/absent = any signed-in user). */
    roles?: readonly string[]
    /** Route is only for signed-out users (e.g. login). */
    guestOnly?: boolean
  }
}

export function installSessionGuard<Role extends string>(
  router: Router,
  options: SessionGuardOptions<Role>,
) {
  router.beforeEach(async (to) => {
    const session = options.useSession()
    await session.ensureLoaded()

    if (to.meta.guestOnly && session.isAuthenticated) return { name: options.homeRouteName }
    if (!to.meta.requiresAuth) return true
    if (!session.isAuthenticated) {
      return { name: options.loginRouteName, query: { redirect: to.fullPath } }
    }
    if (to.meta.roles && !session.hasAnyRole(to.meta.roles as readonly Role[])) {
      return { name: options.forbiddenRouteName }
    }
    return true
  })
}
