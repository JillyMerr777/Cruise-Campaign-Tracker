<template>
  <v-row>
    <v-col v-for="metric in metrics" :key="metric.channel" cols="12" md="3">
      <v-card>
        <v-card-title class="text-subtitle-1">{{ metric.channel }}</v-card-title>
        <v-card-text>
          <div class="text-caption">CTR</div>
          <div class="text-h6">{{ metric.ctr }}%</div>
          <div class="text-caption mt-1">Conversions: {{ metric.conversions }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ChannelMetric } from '../../types/metrics';
defineProps<{ metrics: ChannelMetric[] }>();
</script>
