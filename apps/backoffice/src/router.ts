import { installSessionGuard } from '@booksbee/auth'
import { createRouter, createWebHistory } from 'vue-router'
import { ALL_STAFF_ROLES, useSession } from './stores/session'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/masuk',
      name: 'login',
      component: () => import('./views/StaffLoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/DashboardView.vue'),
      meta: { requiresAuth: true, roles: ALL_STAFF_ROLES },
    },
    {
      path: '/tidak-diizinkan',
      name: 'forbidden',
      component: () => import('./views/ForbiddenView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

installSessionGuard(router, {
  useSession,
  loginRouteName: 'login',
  homeRouteName: 'dashboard',
  forbiddenRouteName: 'forbidden',
})
