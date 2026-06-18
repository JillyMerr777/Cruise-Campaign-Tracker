<template>
  <v-card>
    <v-card-text>
      <div class="text-caption text-medium-emphasis">{{ label }}</div>
      <div class="kpi-value">{{ value }}</div>
      <MetricDelta :delta="delta" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import MetricDelta from '../shared/MetricDelta.vue';

defineProps<{ label: string; value: string; delta: number }>();
</script>
