<template>
  <v-card>
    <v-card-title>Channel Mix</v-card-title>
    <v-card-text style="height: 260px">
      <Doughnut :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import type { ChannelMetric } from '../../types/metrics';

const props = defineProps<{ metrics: ChannelMetric[] }>();

const chartData = computed(() => ({
  labels: props.metrics.map((m) => m.channel),
  datasets: [
    {
      data: props.metrics.map((m) => m.spend),
      backgroundColor: ['#2de2e6', '#ff6ec7', '#f4ff52', '#5df4a4', '#55a7ff']
    }
  ]
}));
</script>
