<template>
  <v-card>
    <v-card-title>Budget vs Spend</v-card-title>
    <v-card-text style="height: 260px">
      <Bar :data="chartData" :options="defaultChartOptions" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { defaultChartOptions } from '../../utils/chartHelpers';

const props = defineProps<{ budget: number; spend: number }>();

const chartData = computed(() => ({
  labels: ['Budget', 'Spend'],
  datasets: [{ data: [props.budget, props.spend], backgroundColor: ['#55a7ff', '#ffb44f'] }]
}));
</script>
