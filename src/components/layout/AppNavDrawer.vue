<template>
  <v-navigation-drawer
    :rail="display.smAndDown.value"
    permanent
    class="app-drawer"
    color="transparent"
    aria-label="Primary navigation"
  >
    <v-list nav density="comfortable">
      <v-list-item
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :aria-label="`Go to ${item.title}`"
        rounded="lg"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const display = useDisplay();

const items = [
  { to: '/', title: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
  { to: '/campaigns/new', title: 'New Campaign', icon: 'mdi-plus-box-outline' },
  { to: '/lifecycle', title: 'Lifecycle Tracker', icon: 'mdi-chart-timeline-variant' }
];
</script>
