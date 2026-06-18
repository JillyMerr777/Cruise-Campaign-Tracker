<template>
  <v-card>
    <v-card-title>Quick Actions</v-card-title>
    <v-card-text class="d-flex flex-wrap ga-2">
      <v-btn color="primary" to="/campaigns/new" prepend-icon="mdi-plus">Create Campaign</v-btn>
      <v-btn variant="tonal" prepend-icon="mdi-content-copy">Duplicate</v-btn>
      <v-btn variant="tonal" prepend-icon="mdi-pause-circle">Pause</v-btn>
      <v-btn variant="tonal" to="/lifecycle" prepend-icon="mdi-chart-timeline-variant">Review Lifecycle</v-btn>
    </v-card-text>
  </v-card>
</template>
