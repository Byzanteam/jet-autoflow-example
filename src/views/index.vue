<template>
  <HelloWorld :msg="msg" />
</template>

<script setup lang="ts">
import { getEnv } from 'envs'

import HelloWorld from '@/components/HelloWorld.vue'

const msg = getEnv('VITE_PROJECT_NAME')
</script>
