<template>
  <v-chip :color="color" :prepend-icon="icon" size="small" label>{{ label }}</v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ label: string }>();

const color = computed(() => {
  if (props.label.includes('Well') || props.label.includes('Active')) return 'success';
  if (props.label.includes('Attention') || props.label.includes('Paused')) return 'warning';
  if (props.label.includes('Under')) return 'error';
  return 'info';
});

const icon = computed(() => {
  if (props.label.includes('Well') || props.label.includes('Active')) return 'mdi-check-circle-outline';
  if (props.label.includes('Attention') || props.label.includes('Paused')) return 'mdi-alert-outline';
  if (props.label.includes('Under')) return 'mdi-alert-octagon-outline';
  return 'mdi-information-outline';
});
</script>
