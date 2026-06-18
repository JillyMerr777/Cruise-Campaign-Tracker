<template>
  <div class="d-flex align-center justify-space-between mb-3">
    <div>
      <h2 class="text-h6 mb-1">{{ title }}</h2>
      <p v-if="subtitle" class="text-body-2 text-medium-emphasis">{{ subtitle }}</p>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
