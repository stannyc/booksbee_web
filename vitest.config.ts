import { defineConfig } from 'vitest/config'

// Each app/package with tests has its own vitest.config.ts; `pnpm test` runs them all.
export default defineConfig({
  test: {
    projects: ['apps/*', 'packages/*'],
  },
})
