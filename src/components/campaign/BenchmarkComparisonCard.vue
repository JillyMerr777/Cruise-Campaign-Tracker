<template>
  <v-card>
    <v-card-title>Benchmark Comparison</v-card-title>
    <v-table density="compact">
      <thead>
        <tr>
          <th>Channel</th>
          <th>Your CTR</th>
          <th>Benchmark</th>
          <th>Delta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.channel">
          <td>{{ row.channel }}</td>
          <td>{{ row.ctr.toFixed(2) }}%</td>
          <td>{{ row.benchmarkCtr.toFixed(2) }}%</td>
          <td>
            <MetricDelta :delta="row.delta" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import MetricDelta from '../shared/MetricDelta.vue';
defineProps<{ rows: Array<{ channel: string; ctr: number; benchmarkCtr: number; delta: number }> }>();
</script>
