module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    semi: ['warn', 'always'],
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off'
  }
};
