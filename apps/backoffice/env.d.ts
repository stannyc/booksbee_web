/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API base URL, e.g. `/v1` (proxied in dev) or `https://api.booksbee.id/v1`. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
