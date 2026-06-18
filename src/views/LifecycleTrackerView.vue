<template>
  <div class="mb-4 dashboard-hero-card pa-4 pa-md-5">
    <div class="d-flex justify-space-between align-start flex-wrap ga-3">
      <div>
        <h1 class="page-title">Campaign Lifecycle Tracker</h1>
        <p class="page-subtitle mb-0">Coordinate execution from briefing to archive with clear stage ownership and deadline visibility.</p>
      </div>
      <div class="d-flex ga-2 flex-wrap">
        <v-chip color="warning" variant="tonal" prepend-icon="mdi-timer-sand">{{ pendingCount }} Items Need Attention</v-chip>
        <v-chip color="info" variant="tonal" prepend-icon="mdi-account-group-outline">{{ activeOwners }} Active Owners</v-chip>
      </div>
    </div>
  </div>

  <FilterBar v-model="filters" />

  <v-row class="mb-4" dense>
    <v-col cols="12" sm="6" md="3">
      <v-card>
        <v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Completed Stages</div>
          <div class="kpi-value">{{ completeCount }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card>
        <v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">In Progress</div>
          <div class="kpi-value">{{ inProgressCount }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card>
        <v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Pending</div>
          <div class="kpi-value">{{ pendingCount }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="3">
      <v-card>
        <v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Stage Completion</div>
          <div class="kpi-value">{{ completionRate }}%</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <LifecycleStepper class="mb-4" />

  <v-row class="mb-4">
    <v-col cols="12" lg="6"><LifecycleStageCard :stages="stages" /></v-col>
    <v-col cols="12" lg="6"><DeliverablesChecklist /></v-col>
    <v-col cols="12" lg="6"><MilestonesTimeline /></v-col>
    <v-col cols="12" lg="6"><BlockersPanel /></v-col>
  </v-row>

  <v-row>
    <v-col cols="12" lg="7">
      <v-card>
        <v-card-title class="d-flex align-center ga-2">
          <v-icon color="warning" icon="mdi-calendar-clock-outline" />
          Upcoming Deadlines
        </v-card-title>
        <v-card-subtitle>Ordered by nearest due date for non-complete stages.</v-card-subtitle>
        <v-card-text>
          <v-list v-if="upcomingStages.length > 0" lines="two" class="bg-transparent">
            <v-list-item
              v-for="stage in upcomingStages"
              :key="`${stage.name}-${stage.dueDate}`"
              :title="stage.name"
              :subtitle="`Owner: ${stage.owner || 'Unassigned'} • Due ${stage.dueDate || 'TBD'}`"
            >
              <template #append>
                <v-chip :color="stage.status === 'In Progress' ? 'info' : 'warning'" size="small" variant="tonal">
                  {{ stage.status }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
          <p v-else class="text-body-2 mb-0">No pending deadlines in the current lifecycle view.</p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="5">
      <v-card>
        <v-card-title>Owner Capacity Snapshot</v-card-title>
        <v-card-subtitle>Open stage assignments by owner.</v-card-subtitle>
        <v-card-text>
          <v-list density="compact" class="bg-transparent">
            <v-list-item v-for="owner in ownerLoad" :key="owner.name" :title="owner.name">
              <template #append>
                <v-chip size="x-small" color="secondary" variant="tonal">{{ owner.count }} open</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import BlockersPanel from '../components/lifecycle/BlockersPanel.vue';
import DeliverablesChecklist from '../components/lifecycle/DeliverablesChecklist.vue';
import LifecycleStageCard from '../components/lifecycle/LifecycleStageCard.vue';
import LifecycleStepper from '../components/lifecycle/LifecycleStepper.vue';
import MilestonesTimeline from '../components/lifecycle/MilestonesTimeline.vue';
import FilterBar from '../components/shared/FilterBar.vue';
import { dataService } from '../services/dataService';

const filters = reactive({ channel: 'All', status: 'All', destination: 'All', segment: '' });
const stages = dataService.lifecycle[0]?.stages ?? [];

const completeCount = computed(() => stages.filter((stage) => stage.status === 'Complete').length);
const inProgressCount = computed(() => stages.filter((stage) => stage.status === 'In Progress').length);
const pendingCount = computed(() => stages.filter((stage) => stage.status === 'Pending').length);
const completionRate = computed(() => {
  if (stages.length === 0) return 0;
  return Math.round((completeCount.value / stages.length) * 100);
});

const upcomingStages = computed(() => {
  return [...stages]
    .filter((stage) => stage.status !== 'Complete')
    .sort((a, b) => {
      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Number.POSITIVE_INFINITY;
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Number.POSITIVE_INFINITY;
      return aDate - bDate;
    })
    .slice(0, 5);
});

const ownerLoad = computed(() => {
  const counts = stages
    .filter((stage) => stage.status !== 'Complete')
    .reduce<Record<string, number>>((acc, stage) => {
      const owner = stage.owner || 'Unassigned';
      acc[owner] = (acc[owner] ?? 0) + 1;
      return acc;
    }, {});

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

const activeOwners = computed(() => {
  return new Set(stages.filter((stage) => stage.owner).map((stage) => stage.owner)).size;
});
</script>
