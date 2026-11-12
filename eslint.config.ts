import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from 'eslint-config-prettier'

export default defineConfigWithVueTs(
  {
    name: 'booksbee/ignores',
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**', 'packages/api/src/gen/**'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
)
