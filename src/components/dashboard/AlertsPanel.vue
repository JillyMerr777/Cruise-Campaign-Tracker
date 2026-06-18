<template>
  <v-card>
    <v-card-title>Alerts</v-card-title>
    <v-list density="compact">
      <v-list-item v-for="alert in alerts" :key="alert.id" :prepend-icon="icon(alert.type)">
        <v-list-item-title>{{ alert.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ alert.message }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { AlertItem } from '../../types/alerts';

defineProps<{ alerts: AlertItem[] }>();

const icon = (type: AlertItem['type']) => {
  if (type === 'warning') return 'mdi-alert-outline';
  if (type === 'error') return 'mdi-close-octagon-outline';
  if (type === 'success') return 'mdi-check-circle-outline';
  return 'mdi-information-outline';
};
</script>
