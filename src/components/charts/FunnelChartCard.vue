<template>
  <v-card>
    <v-card-title>Booking Funnel</v-card-title>
    <v-card-text>
      <v-progress-linear v-for="step in steps" :key="step.label" :model-value="step.value" height="12" rounded class="mb-2">
        <template #default>{{ step.label }} • {{ step.value }}%</template>
      </v-progress-linear>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const steps = [
  { label: 'Awareness', value: 100 },
  { label: 'Consideration', value: 58 },
  { label: 'Click', value: 31 },
  { label: 'Booking', value: 12 },
  { label: 'Upgrade', value: 7 }
];
</script>
