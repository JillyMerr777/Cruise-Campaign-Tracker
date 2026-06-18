<template>
  <v-card class="mb-4">
    <v-card-text class="d-flex flex-wrap align-center justify-space-between ga-3">
      <div>
        <h1 class="page-title">{{ campaign.name }}</h1>
        <p class="page-subtitle mb-0">{{ campaign.objective }}</p>
      </div>
      <StatusChip :label="campaign.health" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Campaign } from '../../types/campaign';
import StatusChip from '../shared/StatusChip.vue';
defineProps<{ campaign: Campaign }>();
</script>
