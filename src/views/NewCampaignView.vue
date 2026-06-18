<template>
  <div class="mb-4">
    <h1 class="page-title">Start New Campaign</h1>
    <p class="page-subtitle">Create campaign setup across audience, destination, channel mix, and lifecycle ownership.</p>
  </div>

  <CampaignForm class="mb-4" />

  <v-card>
    <v-card-text class="d-flex ga-2 flex-wrap">
      <v-btn color="primary" prepend-icon="mdi-content-save-outline">Save Campaign Draft</v-btn>
      <v-btn variant="tonal" to="/">Cancel</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import CampaignForm from '../components/campaign/CampaignForm.vue';
</script>
