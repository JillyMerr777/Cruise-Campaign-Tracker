<template>
  <v-card>
    <v-card-title>Past Campaign Highlights</v-card-title>
    <v-list>
      <v-list-item v-for="campaign in completed" :key="campaign.id">
        <v-list-item-title>{{ campaign.name }}</v-list-item-title>
        <v-list-item-subtitle>ROI {{ campaign.roi }}x • {{ campaign.destination }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Campaign } from '../../types/campaign';

const props = defineProps<{ campaigns: Campaign[] }>();
const completed = computed(() => props.campaigns.filter((c) => c.status === 'Completed'));
</script>
