<template>
  <v-navigation-drawer
    v-model:rail="rail"
    permanent
    class="app-drawer"
    color="transparent"
    aria-label="Primary navigation"
  >
    <div class="drawer-header px-3 py-3">
      <div class="d-flex align-center justify-space-between">
        <div v-if="!rail" class="drawer-brand d-flex align-center ga-2">
          <v-avatar size="28" color="primary" variant="tonal">
            <v-icon size="16" icon="mdi-finance" />
          </v-avatar>
          <div>
            <div class="text-caption font-weight-bold">Marketing Intel</div>
            <div class="text-caption text-medium-emphasis">Operations Hub</div>
          </div>
        </div>
        <v-btn
          :icon="rail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'"
          variant="text"
          size="small"
          :aria-label="rail ? 'Expand navigation' : 'Collapse navigation'"
          @click="rail = !rail"
        />
      </div>
    </div>

    <v-list nav density="comfortable" class="py-2">
      <v-list-item
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :subtitle="rail ? undefined : item.description"
        :aria-label="`Go to ${item.title}`"
        rounded="lg"
      />
    </v-list>

    <template #append>
      <div class="pa-3 drawer-footer">
        <v-card variant="outlined" class="pa-2">
          <div class="d-flex align-center ga-2">
            <v-avatar size="36" color="secondary"><span class="text-caption font-weight-bold">AM</span></v-avatar>
            <div v-if="!rail" class="flex-1-1">
              <div class="text-body-2 font-weight-medium">Ava Martinez</div>
              <div class="text-caption text-medium-emphasis">Campaign Operations Lead</div>
            </div>
            <v-btn icon="mdi-logout" variant="text" size="small" aria-label="Sign out" />
          </div>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const rail = ref(false);

watch(
  () => display.mdAndDown.value,
  (isSmall) => {
    if (isSmall) rail.value = true;
  },
  { immediate: true }
);

const items = [
  {
    to: '/',
    title: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    description: 'Monitor KPIs, campaign health, and channel performance.'
  },
  {
    to: '/campaigns/new',
    title: 'New Campaign',
    icon: 'mdi-plus-box-outline',
    description: 'Create campaign plans, targets, and channel mix.'
  },
  {
    to: '/lifecycle',
    title: 'Lifecycle Tracker',
    icon: 'mdi-chart-timeline-variant',
    description: 'Track approvals, QA, blockers, and launch readiness.'
  }
];
</script>
