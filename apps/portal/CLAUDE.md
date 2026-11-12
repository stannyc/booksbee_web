# apps/portal: authoring portal (public)
For teachers and parents (where allowed). Read the root `CLAUDE.md` first.

## Rules
- **Login by QR scan from the signed-in mobile app** (AUTH-1/2). The steps:
  1. `POST /auth/qr-login` returns a single-use token (~60s). Render `qr_payload` as a QR and auto-refresh it before expiry.
  2. Wait on SSE at `/auth/qr-login/{tokenId}/events` for `approved` / `denied` / `expired`.
  3. On approval the API sets the HttpOnly `bb_session` cookie. Call `session.refresh()`.
  4. Offer the short-code fallback for broken cameras.
- Permissions come from the account role (`parent` / `teacher`), not the login method (ACC-1).
- **Staff never sign in here.** The portal has no staff login and no links to the backoffice (ACC-4).
- Question workflow: `draft → in_review → approved | rejected` (CNT-4). Teachers write, submit and see
  review status here. Staff review in the backoffice (CNT-8).
- v1 questions have **exactly 2 options**, 1 correct (PLY-1). Validate this in the editor.
- **No upload of book pages, photos or scans** (CNT-3). Don't add file or camera inputs for content.
- Show a reminder in the editor **not to copy book exercises verbatim** (CNT-6, CNT-7).
- Bulk entry matters: teachers write hundreds of questions per book. Optimise for keyboard flow,
  fast chapter switching and drafts that survive a refresh.
- `src/dev/` holds dev-only helpers. Load them only behind `import.meta.env.DEV` so they never ship.
