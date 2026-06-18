<template>
  <v-card>
    <v-card-title>Performance Trend</v-card-title>
    <v-card-text style="height: 320px">
      <Line :data="chartData" :options="defaultChartOptions" />
      <AccessibleChartSummary summary="Weekly clicks and conversions are trending upward with a mild plateau this week." />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { defaultChartOptions } from '../../utils/chartHelpers';
import AccessibleChartSummary from '../shared/AccessibleChartSummary.vue';

const props = defineProps<{ clicks: number; conversions: number }>();

const chartData = computed(() => ({
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  datasets: [
    {
      label: 'Clicks',
      data: [props.clicks * 0.11, props.clicks * 0.14, props.clicks * 0.18, props.clicks * 0.16, props.clicks * 0.19, props.clicks * 0.22],
      borderColor: '#2de2e6',
      backgroundColor: 'rgba(45,226,230,0.18)',
      fill: true,
      tension: 0.35
    },
    {
      label: 'Conversions',
      data: [props.conversions * 0.1, props.conversions * 0.12, props.conversions * 0.16, props.conversions * 0.18, props.conversions * 0.21, props.conversions * 0.23],
      borderColor: '#ff6ec7',
      tension: 0.35
    }
  ]
}));
</script>
