<template>
  <v-card class="h-100">
    <v-card-title class="d-flex align-center ga-2">
      <v-icon color="info" icon="mdi-swap-horizontal-bold" />
      Channel Performance
    </v-card-title>
    <v-card-subtitle>Comparative ranking across paid, social, video, email, and organic channels.</v-card-subtitle>
    <v-card-text>
      <div v-if="rankedChannels.length > 0">
        <div v-for="channel in rankedChannels" :key="channel.label" class="mb-3">
          <div class="d-flex align-center justify-space-between mb-1">
            <div>
              <div class="text-body-2 font-weight-semibold">{{ channel.label }}</div>
              <div class="text-caption text-medium-emphasis">CTR {{ channel.ctr.toFixed(2) }}% • {{ channel.conversions }} conversions</div>
            </div>
            <v-chip size="x-small" color="primary" variant="tonal">Score {{ channel.score }}</v-chip>
          </div>
          <v-progress-linear :model-value="channel.score" color="info" rounded height="8" />
        </div>
      </div>
      <p v-else class="text-body-2 mb-0">No channel metrics available for current filters.</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChannelMetric } from '../../types/metrics';

const props = defineProps<{ metrics: ChannelMetric[] }>();

const rankedChannels = computed(() => {
  const grouped = props.metrics.reduce<Record<string, { ctrSum: number; conversions: number; spend: number; revenue: number; count: number }>>((acc, metric) => {
    const current = acc[metric.channel] ?? { ctrSum: 0, conversions: 0, spend: 0, revenue: 0, count: 0 };

    acc[metric.channel] = {
      ctrSum: current.ctrSum + metric.ctr,
      conversions: current.conversions + metric.conversions,
      spend: current.spend + metric.spend,
      revenue: current.revenue + (metric.revenue ?? 0),
      count: current.count + 1
    };

    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([label, value]) => {
      const ctr = value.ctrSum / Math.max(value.count, 1);
      const roas = value.spend === 0 ? 0 : value.revenue / value.spend;
      const rawScore = ctr * 8 + value.conversions / 10 + roas * 25;

      return {
        label,
        ctr,
        conversions: value.conversions,
        score: Math.max(0, Math.min(100, Math.round(rawScore)))
      };
    })
    .sort((a, b) => b.score - a.score);
});
</script>
