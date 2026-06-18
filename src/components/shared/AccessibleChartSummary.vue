<template>
  <p class="mt-2 text-xs text-slate-500">
    {{ summary }}
  </p>
</template>

<script setup lang="ts">
defineProps<{ summary: string }>();
</script>
