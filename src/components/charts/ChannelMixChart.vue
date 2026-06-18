<template>
  <v-card>
    <v-card-title>Channel Mix</v-card-title>
    <v-card-text style="height: 260px">
      <Doughnut :data="chartData" :options="options" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import type { ChannelMetric } from '../../types/metrics';
import { chartPalette, doughnutChartOptions } from '../../utils/chartHelpers';
import { formatCurrency } from '../../utils/formatters';

const props = defineProps<{ metrics: ChannelMetric[] }>();

type MixTooltipContext = {
  label?: string;
  parsed: number;
};

const options = computed(() => ({
  ...doughnutChartOptions,
  plugins: {
    ...doughnutChartOptions.plugins,
    tooltip: {
      ...doughnutChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: MixTooltipContext) => `${context.label ?? 'Channel'}: ${formatCurrency(context.parsed)}`
      }
    }
  }
}));

const chartData = computed(() => ({
  labels: props.metrics.map((m) => m.channel),
  datasets: [
    {
      data: props.metrics.map((m) => m.spend),
      backgroundColor: [
        chartPalette.teal,
        chartPalette.aqua,
        chartPalette.coral,
        chartPalette.violet,
        chartPalette.lavender,
        chartPalette.mint,
        chartPalette.sky,
        chartPalette.amber
      ],
      borderColor: 'rgba(255,255,255,0.9)',
      borderWidth: 2,
      hoverOffset: 8
    }
  ]
}));
</script>
