<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Budget vs Spend</CardTitle>
    </CardHeader>
    <CardContent class="h-[260px]">
      <Bar :data="chartData" :options="options" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TooltipItem } from 'chart.js';
import { chartPalette, defaultChartOptions } from '../../utils/chartHelpers';
import { formatCurrency } from '../../utils/formatters';

const props = defineProps<{ budget: number; spend: number }>();

const compactCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value);

const tooltipValue = (context: TooltipItem<'bar'>): number => context.parsed.y ?? 0;

const options = computed(() => ({
  ...defaultChartOptions,
  scales: {
    ...defaultChartOptions.scales,
    y: {
      ...defaultChartOptions.scales.y,
      ticks: {
        ...defaultChartOptions.scales.y.ticks,
        callback: (value: string | number) => compactCurrency(Number(value))
      }
    }
  },
  plugins: {
    ...defaultChartOptions.plugins,
    tooltip: {
      ...defaultChartOptions.plugins.tooltip,
      callbacks: {
        label: (context: TooltipItem<'bar'>) => `${context.label ?? 'Value'}: ${formatCurrency(tooltipValue(context))}`
      }
    }
  }
}));

const chartData = computed(() => ({
  labels: ['Budget', 'Spend'],
  datasets: [
    {
      data: [props.budget, props.spend],
      backgroundColor: [chartPalette.sky, chartPalette.amber],
      borderRadius: 10,
      borderSkipped: false,
      maxBarThickness: 36
    }
  ]
}));
</script>
