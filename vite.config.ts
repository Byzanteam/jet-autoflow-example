import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import AutoRoutesPlugin from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      AutoRoutesPlugin({
        routeStyle: 'nuxt',
        dirs: ['src/views'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
