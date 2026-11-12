# apps/backoffice: internal staff admin (restricted)
Read the root `CLAUDE.md` first. Scope: schools/groups/users, question review queue, pilot metrics.
Payouts and subscriptions come later.

## Rules
- **Staff only.** Separate staff login (email + password) with **mandatory 2FA** (ACC-4). No QR login here.
- **Role-based permissions:** `reviewer` (question review), `finance` (payouts/subscriptions, later),
  `admin` (schools, groups, users, roles). Gate every route with `meta.requiresAuth` + `meta.roles`.
  The UI gate is convenience only. The API enforces roles on every request.
- **Every admin action is audit-logged** (who, what, when, before/after) by the API. Never add an action
  that bypasses it. Destructive or bulk actions need an explicit confirmation step.
- **Calls only admin endpoints** (`/admin/...`). If an endpoint is missing, propose it in `../hub/contracts`
  (use the `contract-change` skill) rather than reusing portal or mobile endpoints.
- **Never exposed via portal links.** The portal and mobile apps must not link to or mention the backoffice.
  Keep `noindex` and `robots.txt`. Deploy behind restricted access (separate environment `backoffice-production`).
- Respect hard constraints even with admin powers: progress is never deleted (SLT-4), no balances or
  in-app money (BIL-1), and no book-page uploads (CNT-3).
- Reviewing questions (CNT-4/CNT-8): approve or reject with a reason that the author sees in the portal.
  Check for 2 options (PLY-1) and verbatim copying from books (CNT-7).
- `src/dev/` holds dev-only helpers. Load them only behind `import.meta.env.DEV` so they never ship.
