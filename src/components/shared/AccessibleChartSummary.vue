<template>
  <p class="text-caption text-medium-emphasis mt-2">
    {{ summary }}
  </p>
</template>

<script setup lang="ts">
defineProps<{ summary: string }>();
</script>
