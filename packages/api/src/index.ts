export { createApiClient } from './client'
export type { ApiClient, ApiClientOptions } from './client'
export type { paths, components, operations } from './gen/schema'

import type { components } from './gen/schema'

/** Shorthand for a schema from the contract, e.g. `Schema<'Question'>`. */
export type Schema<Name extends keyof components['schemas']> = components['schemas'][Name]
