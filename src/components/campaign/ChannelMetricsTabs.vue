<template>
  <v-card>
    <v-card-title>Channel Metrics</v-card-title>
    <v-tabs v-model="tab" color="primary">
      <v-tab v-for="metric in metrics" :key="metric.channel" :value="metric.channel">{{ metric.channel }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="metric in metrics" :key="metric.channel" :value="metric.channel">
        <v-card-text>
          <div>Impressions: {{ metric.impressions }}</div>
          <div>Clicks: {{ metric.clicks }}</div>
          <div>CTR: {{ metric.ctr }}%</div>
          <div>Conversions: {{ metric.conversions }}</div>
          <div>Spend: {{ metric.spend }}</div>
        </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ChannelMetric } from '../../types/metrics';

const props = defineProps<{ metrics: ChannelMetric[] }>();
const tab = ref(props.metrics[0]?.channel || '');
</script>
