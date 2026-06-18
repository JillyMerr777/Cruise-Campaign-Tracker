<template>
  <span :class="delta >= 0 ? 'text-success' : 'text-error'" class="text-caption font-weight-medium">
    <v-icon size="14" :icon="delta >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'" />
    {{ delta >= 0 ? '+' : '' }}{{ delta.toFixed(1) }}%
  </span>
</template>

<script setup lang="ts">
defineProps<{ delta: number }>();
</script>
