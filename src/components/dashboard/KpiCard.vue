<template>
  <v-card>
    <v-card-text>
      <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
        <span>{{ label }}</span>
        <v-tooltip v-if="deltaContext" location="top">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-information-outline"
              size="x-small"
              density="compact"
              variant="text"
              :aria-label="`${label} delta context`"
            />
          </template>
          <span>{{ deltaContext }}</span>
        </v-tooltip>
      </div>
      <div class="kpi-value">{{ value }}</div>
      <MetricDelta :delta="delta" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import MetricDelta from '../shared/MetricDelta.vue';

defineProps<{ label: string; value: string; delta: number; deltaContext?: string }>();
</script>
