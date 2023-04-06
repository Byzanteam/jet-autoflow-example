<template>
  <h1 class="text-gray-900">{{ msg }}</h1>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>
