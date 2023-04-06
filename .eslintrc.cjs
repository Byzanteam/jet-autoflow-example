require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@byzanteam/eslint-config-vue-ts'],
  settings: {
    'import/core-modules': ['envs', '~pages'],
  },
  rules: {
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: false,
      },
    ],
    'vue/no-restricted-block': [
      'error',
      {
        element: 'style',
        message:
          'this project use tailwind, do not use <style> block in this project',
      },
    ],
  },
}
