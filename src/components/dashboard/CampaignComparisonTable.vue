<template>
  <v-card>
    <v-card-title>Campaign Comparison</v-card-title>
    <v-data-table :items="campaigns" :headers="headers" density="comfortable">
      <template #item.health="{ item }">
        <HealthStatusBadge :health="item.health" />
      </template>
      <template #item.name="{ item }">
        <router-link :to="`/campaigns/${item.id}`" class="text-primary text-decoration-none">{{ item.name }}</router-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import type { Campaign } from '../../types/campaign';
import HealthStatusBadge from './HealthStatusBadge.vue';

defineProps<{ campaigns: Campaign[] }>();

const headers = [
  { title: 'Campaign', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Budget', key: 'budget' },
  { title: 'Spend', key: 'spend' },
  { title: 'CTR', key: 'ctr' },
  { title: 'Conversions', key: 'conversions' },
  { title: 'ROI', key: 'roi' },
  { title: 'Health', key: 'health' }
];
</script>
