<template>
  <v-card class="kpi-card">
    <v-card-text class="pa-4">
      <div class="d-flex align-center justify-space-between mb-2">
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

        <v-avatar :color="delta >= 0 ? 'success' : 'error'" variant="tonal" size="30">
          <v-icon :icon="icon || 'mdi-chart-box-outline'" size="16" />
        </v-avatar>
      </div>

      <div class="kpi-value mb-1">{{ value }}</div>

      <div class="d-flex align-center justify-space-between">
        <MetricDelta :delta="delta" />
        <v-chip :color="delta >= 0 ? 'success' : 'error'" size="x-small" variant="tonal" label>
          {{ delta >= 0 ? 'Improving' : 'Declining' }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import MetricDelta from '../shared/MetricDelta.vue';

defineProps<{ label: string; value: string; delta: number; deltaContext?: string; icon?: string }>();
</script>
