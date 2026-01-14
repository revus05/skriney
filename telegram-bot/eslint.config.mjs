import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const tsEslintConfig = tseslint.config(
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
)

const prettierConfig = [
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 80,
          endOfLine: 'auto',
          arrowParens: 'always',
        },
        {
          usePrettierrc: false,
        },
      ],
    },
  }),
]

// Объединяем всё в один массив
const eslintConfig = [...tsEslintConfig, ...prettierConfig]

export default eslintConfig
