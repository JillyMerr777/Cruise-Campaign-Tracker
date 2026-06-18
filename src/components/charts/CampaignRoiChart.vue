<template>
  <v-card>
    <v-card-title>Campaign ROI</v-card-title>
    <v-card-text style="height: 260px">
      <Bar :data="chartData" :options="defaultChartOptions" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { defaultChartOptions } from '../../utils/chartHelpers';
import type { Campaign } from '../../types/campaign';

const props = defineProps<{ campaigns: Campaign[] }>();

const chartData = computed(() => ({
  labels: props.campaigns.map((c) => c.name),
  datasets: [{ label: 'ROI', data: props.campaigns.map((c) => c.roi), backgroundColor: '#2de2e6' }]
}));
</script>
