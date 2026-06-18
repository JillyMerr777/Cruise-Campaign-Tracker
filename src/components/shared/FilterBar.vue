<template>
  <v-card class="mb-4" color="surface" role="search" aria-label="Campaign filters">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-select v-model="model.channel" label="Channel" :items="channels" density="comfortable" aria-label="Filter by channel" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select v-model="model.status" label="Status" :items="statuses" density="comfortable" aria-label="Filter by status" />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="model.destination"
            label="Destination"
            :items="destinations"
            density="comfortable"
            aria-label="Filter by destination"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="model.segment"
            label="Audience Segment"
            density="comfortable"
            aria-label="Filter by audience segment"
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn variant="text" prepend-icon="mdi-filter-off-outline" @click="clearFilters">Clear Filters</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { DESTINATIONS, CHANNELS, STATUSES } from '../../utils/constants';

const model = defineModel<{ channel: string; status: string; destination: string; segment: string }>({
  default: {
    channel: 'All',
    status: 'All',
    destination: 'All',
    segment: ''
  }
});

const channels = ['All', ...CHANNELS];
const statuses = ['All', ...STATUSES];
const destinations = ['All', ...DESTINATIONS];

const clearFilters = () => {
  model.value = {
    channel: 'All',
    status: 'All',
    destination: 'All',
    segment: ''
  };
};
</script>
