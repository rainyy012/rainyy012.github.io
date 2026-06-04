import { Severity } from '@glyph-cat/eslint-config'
import { libraryAuthoring as baseLibraryAuthoring } from '@glyph-cat/eslint-config/base'
import { recommended as jestRecommended } from '@glyph-cat/eslint-config/jest'
import { libraryAuthoring as reactLibraryAuthoring } from '@glyph-cat/eslint-config/react'
import { defineConfig } from 'eslint/config'

module.exports = defineConfig(
  baseLibraryAuthoring,
  reactLibraryAuthoring,
  jestRecommended,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': Severity.OFF,
      '@typescript-eslint/no-empty-interface': Severity.OFF,
      '@typescript-eslint/no-explicit-any': Severity.OFF,
      '@typescript-eslint/no-require-imports': Severity.OFF,
      'import/no-unresolved': Severity.OFF, // Let TS handle broken imports
      'no-console': Severity.OFF,
      'no-restricted-imports': [Severity.ERROR, {
        name: 'react-toastify',
        importNames: [
          'toast',
        ],
        message: 'Please import { CustomToast } from \'@site/src/utils/toast\' instead',
      }],
    },
  },
  {
    settings: {
      react: {
        version: '19',
      },
    },
  },
  {
    ignores: [
      '.docusaurus',
      'eslint.config.ts',
      'src/theme/', // this preserves ejected code to make git diffing easier
    ],
  },
)
