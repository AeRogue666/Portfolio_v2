import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import vueParser from 'vue-eslint-parser'
import tsParser from 'typescript-eslint'

export default [
    {
        ignores: [
            '.data/**',
            '.nuxt/**',
            '.vscode/**',
            'dist/**',
            '.output/**',
            'node_modules/**',
            'old_config/**'
        ]
    },

    {
        files: ['**/*.vue', '**.*.js', '**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    },

    ...pluginVue.configs['flat/recommended'],
    ...pluginVueA11y.configs['flat/recommended'],
    
    {
        files: ['**/*.vue', '**.*.js', '**/*.ts'],
        rules: {
            'vuejs-accessibility/alt-text': 'error',
            'vuejs-accessibility/aria-props': 'error',
            'vuejs-accessibility/form-control-has-label': 'error',
            'vue/multi-word-component-names': 'off',
        }
    }
]
