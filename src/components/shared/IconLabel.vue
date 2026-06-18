<template>
  <div class="d-inline-flex align-center ga-1">
    <v-icon :icon="icon" size="16" />
    <span class="text-body-2">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ icon: string; label: string }>();
</script>
