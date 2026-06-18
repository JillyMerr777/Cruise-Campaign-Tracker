<template>
  <v-navigation-drawer
    v-model:rail="rail"
    :rail-width="72"
    :width="280"
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
      <template v-for="item in items" :key="item.title">
        <v-tooltip v-if="rail" location="right">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :to="item.to"
              :disabled="item.disabled"
              :prepend-icon="item.icon"
              :title="item.title"
              :aria-label="item.disabled ? `${item.title} coming soon` : `Go to ${item.title}`"
              rounded="lg"
            />
          </template>
          <div class="text-body-2 font-weight-semibold">{{ item.title }}</div>
          <div class="text-caption">{{ item.description }}</div>
        </v-tooltip>

        <v-list-item
          v-else
          :to="item.to"
          :disabled="item.disabled"
          :prepend-icon="item.icon"
          :title="item.title"
          :subtitle="item.description"
          :aria-label="item.disabled ? `${item.title} coming soon` : `Go to ${item.title}`"
          rounded="lg"
        >
          <template #append>
            <v-chip v-if="item.disabled" size="x-small" color="info" variant="tonal">Soon</v-chip>
          </template>
        </v-list-item>
      </template>
    </v-list>

    <template #append>
      <div class="pa-3 drawer-footer">
        <v-card variant="outlined" class="pa-2">
          <div class="d-flex align-center ga-2">
            <v-avatar size="36" color="secondary"><span class="text-caption font-weight-bold">AM</span></v-avatar>
            <div v-if="!rail" class="flex-1-1">
              <div class="text-body-2 font-weight-medium">Ava Martinez</div>
              <div class="text-caption text-medium-emphasis">Senior Marketing Analyst</div>
            </div>
            <v-tooltip location="top" text="Sign Out">
              <template #activator="{ props }">
                <v-btn v-bind="props" icon="mdi-logout" variant="text" size="small" aria-label="Sign out" />
              </template>
            </v-tooltip>
          </div>
          <v-btn v-if="!rail" class="mt-2" block variant="text" prepend-icon="mdi-logout" aria-label="Sign out">
            Sign Out
          </v-btn>
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
    description: 'Campaign performance overview.',
    disabled: false
  },
  {
    to: '/campaigns/new',
    title: 'Campaigns',
    icon: 'mdi-plus-box-outline',
    description: 'Manage and optimize campaigns.',
    disabled: false
  },
  {
    to: '/lifecycle',
    title: 'Analytics',
    icon: 'mdi-chart-line-variant',
    description: 'Performance reporting and stage insights.',
    disabled: false
  },
  {
    to: undefined,
    title: 'Audiences',
    icon: 'mdi-account-group-outline',
    description: 'Customer segments and reach analysis.',
    disabled: true
  },
  {
    to: undefined,
    title: 'Settings',
    icon: 'mdi-cog-outline',
    description: 'Platform configuration.',
    disabled: true
  }
];
</script>
