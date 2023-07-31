require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@byzanteam/eslint-config-ts'],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    'import/core-modules': ['envs'],
  },
}
