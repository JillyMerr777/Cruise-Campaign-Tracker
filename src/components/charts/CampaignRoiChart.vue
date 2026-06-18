<template>
  <v-card>
    <v-card-title>Campaign ROI</v-card-title>
    <v-card-text style="height: 260px">
      <Bar :data="chartData" :options="options" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import type { TooltipItem } from 'chart.js';
import { chartPalette, defaultChartOptions } from '../../utils/chartHelpers';
import type { Campaign } from '../../types/campaign';

const props = defineProps<{ campaigns: Campaign[] }>();

const tooltipValue = (context: TooltipItem<'bar'>): number => context.parsed.y ?? 0;

const options = computed(() => ({
  ...defaultChartOptions,
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales.y,
      ticks: {
        ...defaultChartOptions.scales.y.ticks,
        callback: (value: string | number) => `${Number(value).toFixed(1)}x`
      }
    }
  },
  plugins: {
    ...defaultChartOptions.plugins,
    tooltip: {
      ...defaultChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: TooltipItem<'bar'>) => `${context.label ?? 'Campaign'}: ${tooltipValue(context).toFixed(2)}x ROI`
      }
    }
  }
}));

const chartData = computed(() => ({
  labels: props.campaigns.map((c) => c.name),
  datasets: [
    {
      label: 'ROI',
      data: props.campaigns.map((c) => c.roi),
      backgroundColor: [chartPalette.teal, chartPalette.sky, chartPalette.coral, chartPalette.violet, chartPalette.mint, chartPalette.amber],
      borderRadius: 10,
      borderSkipped: false,
      maxBarThickness: 40
    }
  ]
}));
</script>
