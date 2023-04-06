import { getEnv } from 'envs'
import routes from '~pages'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(getEnv('VITE_BASE_PATH')),
  routes,
})

export default router
