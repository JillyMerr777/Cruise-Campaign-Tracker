<template>
  <v-app-bar flat class="app-topbar px-2 px-sm-4" color="transparent">
    <div class="d-flex align-center ga-3 w-100 flex-wrap flex-md-nowrap">
      <div class="topbar-brand d-flex align-center ga-2">
        <v-avatar size="28" color="primary" variant="tonal">
          <v-icon size="16" icon="mdi-ferry" />
        </v-avatar>
        <span class="font-weight-bold topbar-brand-text">Cruise Campaign Intelligence</span>
      </div>

      <v-chip class="topbar-context-chip" color="info" variant="tonal" prepend-icon="mdi-chart-line">
        {{ currentContext }}
      </v-chip>

      <v-spacer />

      <v-text-field
        class="topbar-search"
        density="compact"
        hide-details
        variant="solo"
        prepend-inner-icon="mdi-magnify"
        aria-label="Search campaigns"
        placeholder="Search campaigns"
      />

      <v-btn icon="mdi-bell-outline" variant="text" aria-label="Open alerts" />
      <v-btn icon="mdi-tune-variant" variant="text" aria-label="Open settings" />
      <v-avatar size="34" class="ml-1" color="secondary">
        <span class="text-caption font-weight-bold">AM</span>
      </v-avatar>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const currentContext = computed(() => {
  if (route.path.startsWith('/campaigns/new')) return 'Campaign Builder';
  if (route.path.startsWith('/lifecycle')) return 'Lifecycle Operations';
  if (route.path.startsWith('/campaigns/')) return 'Campaign Intelligence';
  return 'Executive Dashboard';
});
</script>
