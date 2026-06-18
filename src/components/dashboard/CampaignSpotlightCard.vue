<template>
  <v-card class="card-glow">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Campaign Spotlight</span>
      <HealthStatusBadge :health="campaign.health" />
    </v-card-title>
    <v-card-text>
      <h3 class="text-h5 mb-1">{{ campaign.name }}</h3>
      <p class="text-body-2 text-medium-emphasis mb-3">{{ campaign.objective }}</p>
      <v-row>
        <v-col cols="6" md="3"><div class="text-caption">Destination</div><div>{{ campaign.destination }}</div></v-col>
        <v-col cols="6" md="3"><div class="text-caption">Owner</div><div>{{ campaign.owner }}</div></v-col>
        <v-col cols="6" md="3"><div class="text-caption">ROI</div><div>{{ campaign.roi }}x</div></v-col>
        <v-col cols="6" md="3"><div class="text-caption">CTR</div><div>{{ campaign.ctr }}%</div></v-col>
      </v-row>
      <div class="d-flex ga-2 mt-3">
        <v-btn color="primary" :to="`/campaigns/${campaign.id}`">Open Details</v-btn>
        <v-btn variant="tonal" to="/lifecycle">Lifecycle</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import HealthStatusBadge from './HealthStatusBadge.vue';
import type { Campaign } from '../../types/campaign';

defineProps<{ campaign: Campaign }>();
</script>
