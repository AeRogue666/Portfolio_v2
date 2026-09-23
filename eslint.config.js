import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import vueParser from "vue-eslint-parser";
import tsParser from "typescript-eslint";

export default [
  {
    ignores: [
      ".data/**",
      ".nuxt/**",
      ".vscode/**",
      "dist/**",
      ".output/**",
      "node_modules/**",
      "old_config/**",
    ],
  },

  ...pluginVue.configs["flat/recommended"],
  ...pluginVueA11y.configs["flat/recommended"],

  {
    files: ["**/*.vue", "**/*.js", "**/*.ts"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Règles d'accessibilité
      "vuejs-accessibility/alt-text": "error",
      "vuejs-accessibility/aria-props": "error",
      "vuejs-accessibility/form-control-has-label": "error",
      "vuejs-accessibility/label-has-for": ["error", {
        "components": ["Label"],
        "required": {
          "every": ["id"]
        },
        "allowChildren": true,
        "controlComponents": ["USelect", "UInput", "UTextarea", "UCheckbox", "URadio"]
      }],
      "vue/multi-word-component-names": "off",
      
      // Désactivation des règles de style / indentation
      "vue/html-indent": "off",
      "vue/script-indent": "off",
      "indent": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/max-attributes-per-line": "off",
      "vue/first-attribute-newline": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/attributes-order": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            normal: "never",
            void: "always",
            component: "always",
          },
        },
      ]
    },
  },
];
