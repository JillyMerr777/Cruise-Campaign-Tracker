<template>
  <Card class="border-slate-200 bg-white shadow-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-[0.98rem] font-semibold text-slate-900">Performance Trend</CardTitle>
    </CardHeader>
    <CardContent class="h-[312px] pb-4 pt-0">
      <Line :data="chartData" :options="options" />
      <AccessibleChartSummary summary="Weekly clicks and conversions are trending upward with a mild plateau this week." />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TooltipItem } from 'chart.js';
import { chartPalette, defaultChartOptions } from '../../utils/chartHelpers';
import { formatCompact } from '../../utils/formatters';
import AccessibleChartSummary from '../shared/AccessibleChartSummary.vue';

const props = defineProps<{ clicks: number; conversions: number }>();

const tooltipValue = (context: TooltipItem<'line'>): number => context.parsed.y ?? 0;

const options = computed(() => ({
  ...defaultChartOptions,
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales.y,
      ticks: {
        ...defaultChartOptions.scales.y.ticks,
        callback: (value: string | number) => formatCompact(Number(value))
      }
    }
  },
  plugins: {
    ...defaultChartOptions.plugins,
    tooltip: {
      ...defaultChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: TooltipItem<'line'>) => `${context.dataset.label ?? 'Value'}: ${formatCompact(tooltipValue(context))}`
      }
    }
  }
}));

const chartData = computed(() => ({
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  datasets: [
    {
      label: 'Clicks',
      data: [props.clicks * 0.11, props.clicks * 0.14, props.clicks * 0.18, props.clicks * 0.16, props.clicks * 0.19, props.clicks * 0.22],
      borderColor: chartPalette.teal,
      backgroundColor: 'rgba(0,168,185,0.16)',
      fill: true,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: chartPalette.teal,
      pointBorderWidth: 2,
      pointRadius: 3,
      tension: 0.35
    },
    {
      label: 'Conversions',
      data: [props.conversions * 0.1, props.conversions * 0.12, props.conversions * 0.16, props.conversions * 0.18, props.conversions * 0.21, props.conversions * 0.23],
      borderColor: chartPalette.coral,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: chartPalette.coral,
      pointBorderWidth: 2,
      pointRadius: 3,
      tension: 0.35
    }
  ]
}));
</script>
