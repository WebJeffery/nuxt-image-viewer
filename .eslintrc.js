module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    '@nuxt/eslint'
  ],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}