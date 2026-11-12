# booksbee-web
pnpm monorepo with the two BooksBee web apps, built and deployed separately:
- `apps/portal`: public authoring portal for teachers and parents (QR login from the mobile app).
- `apps/backoffice`: internal admin for staff (staff login with 2FA, role-based, restricted exposure).

## Shared BooksBee context (from the hub)
@../hub/docs/Glossary.md
@../hub/docs/Business\ Rules.md
@../hub/docs/Domain\ Model.md

More context on demand: `../hub/docs/` (start with `BooksBee - Overview.md`, `Technical Architecture.md`).
Contracts: `../hub/contracts/`. Hub instructions: `../hub/CLAUDE.md`.
App-specific rules: `apps/portal/CLAUDE.md`, `apps/backoffice/CLAUDE.md`.

## Shared rules
- `Business Rules.md` is the spec: ✅ required · 🟡 default · ❓ ask before inventing behaviour.
- Use Glossary names for identifiers. Code and commits in English; user-facing copy in Bahasa Indonesia.
- Contract changes start in `../hub/contracts/`. Never change the API shape only in this repo.
- **Never edit `packages/api/src/gen/`.** Change the contract in the hub, then run `pnpm codegen`. It writes
  the hub commit to `.contracts-version`. If that ends in `-dirty`, commit the hub contracts first.
- If you make or need a product decision, stop and update the hub docs (use the `record-decision` skill
  with `--add-dir ../hub`).
- Sessions are HttpOnly cookies. Never store tokens in JS or localStorage. Unsafe requests carry the CSRF
  header via `csrfMiddleware` from `@booksbee/auth`.
- The portal and backoffice never import from each other. Share code through `packages/*` only.

## Workspace layout
| Path | What |
|---|---|
| `apps/portal` | Vue app: QR login, question authoring, teacher/parent views |
| `apps/backoffice` | Vue app: staff login + 2FA, review queue, schools/groups/users, pilot metrics |
| `packages/ui` | Design tokens (Tailwind v4 `@theme` in `styles.css`, `tokens.ts`) and `Bb*` components (Reka UI primitives) |
| `packages/api` | `src/gen/` generated contract types (do not edit); `createApiClient` (openapi-fetch) |
| `packages/auth` | Pinia session store factory, route guard (`meta.requiresAuth` / `roles` / `guestOnly`), CSRF middleware |
| `scripts/codegen.mjs` | openapi-typescript from `../hub/contracts/openapi.yaml` |

Packages are consumed as TypeScript source and have no build step. Stack: Vue 3, Vite, TypeScript (strict),
Vue Router, Pinia, Tailwind CSS v4 + Reka UI, Vitest, ESLint + Prettier. Node: `.nvmrc`; pnpm: `packageManager`.

## Commands
- Dev: `pnpm dev:portal` (http://localhost:5173) · `pnpm dev:backoffice` (http://localhost:5174).
  `/v1` is proxied to the api at `localhost:3000`. Set `VITE_API_BASE_URL` to override.
- Check everything: `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build`. Fix formatting with `pnpm format`.
- One app: `pnpm --filter @booksbee/portal <script>` · tests for one project: `pnpm exec vitest run --project portal`
- Codegen: `pnpm codegen` (needs `../hub`; commit `packages/api/src/gen/` and `.contracts-version`, because CI
  can't see the hub).
- CI: `.github/workflows/web.yml` runs per app, and only for apps whose files (or shared packages / the lockfile) changed.
