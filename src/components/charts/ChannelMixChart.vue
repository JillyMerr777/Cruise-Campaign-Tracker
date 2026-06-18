<template>
  <Card class="flex flex-col border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Channel Mix</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 pt-0 min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]">
      <Doughnut :data="chartData" :options="options" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
