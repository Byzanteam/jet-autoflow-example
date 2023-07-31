import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    testTimeout: 10000,
    environment: 'jsdom',
    include: ['**/*.(test|spec).[jt]s?(x)'],
    passWithNoTests: true,
  },
})
