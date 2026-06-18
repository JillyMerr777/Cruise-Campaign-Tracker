<template>
  <div class="dashboard-hero-card mb-4 rounded-2xl px-4 py-5 md:px-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="max-w-3xl">
        <h1 class="page-title">Campaign Lifecycle Tracker</h1>
        <p class="page-subtitle mb-0 mt-1">
          Coordinate execution from briefing to archive with clear stage ownership and deadline visibility.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge class="bg-amber-100 text-amber-900 hover:bg-amber-100">
          <Hourglass class="mr-1 size-3.5" />
          {{ pendingCount }} Items Need Attention
        </Badge>
        <Badge class="bg-sky-100 text-sky-900 hover:bg-sky-100">
          <Users class="mr-1 size-3.5" />
          {{ activeOwners }} Active Owners
        </Badge>
      </div>
    </div>
  </div>

  <FilterBar v-model="filters" />

  <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
    <Card class="border-sky-100/60 bg-white/85 shadow-[0_12px_26px_rgba(41,71,125,0.12)] backdrop-blur-sm" size="sm">
      <CardContent class="pt-3">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Completed Stages</div>
        <div class="text-2xl font-semibold text-slate-900">{{ completeCount }}</div>
      </CardContent>
    </Card>
    <Card class="border-sky-100/60 bg-white/85 shadow-[0_12px_26px_rgba(41,71,125,0.12)] backdrop-blur-sm" size="sm">
      <CardContent class="pt-3">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">In Progress</div>
        <div class="text-2xl font-semibold text-slate-900">{{ inProgressCount }}</div>
      </CardContent>
    </Card>
    <Card class="border-sky-100/60 bg-white/85 shadow-[0_12px_26px_rgba(41,71,125,0.12)] backdrop-blur-sm" size="sm">
      <CardContent class="pt-3">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Pending</div>
        <div class="text-2xl font-semibold text-slate-900">{{ pendingCount }}</div>
      </CardContent>
    </Card>
    <Card class="border-sky-100/60 bg-white/85 shadow-[0_12px_26px_rgba(41,71,125,0.12)] backdrop-blur-sm" size="sm">
      <CardContent class="pt-3">
        <div class="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Stage Completion</div>
        <div class="text-2xl font-semibold text-slate-900">{{ completionRate }}%</div>
      </CardContent>
    </Card>
  </div>

  <LifecycleStepper class="mb-4" />

  <div class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    <LifecycleStageCard :stages="stages" />
    <DeliverablesChecklist />
    <MilestonesTimeline />
    <BlockersPanel />
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
    <div class="lg:col-span-7">
      <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
        <CardHeader class="pb-2">
          <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900">
            <CalendarClock class="size-4 text-amber-500" />
          Upcoming Deadlines
          </CardTitle>
          <CardDescription>Ordered by nearest due date for non-complete stages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="upcomingStages.length > 0" class="space-y-2">
            <div
              v-for="stage in upcomingStages"
              :key="`${stage.name}-${stage.dueDate}`"
              class="flex items-center justify-between rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2"
            >
              <div>
                <div class="text-sm font-medium text-slate-800">{{ stage.name }}</div>
                <div class="text-xs text-slate-500">Owner: {{ stage.owner || 'Unassigned' }} • Due {{ stage.dueDate || 'TBD' }}</div>
              </div>
              <Badge :class="stage.status === 'In Progress' ? 'bg-sky-100 text-sky-900 hover:bg-sky-100' : 'bg-amber-100 text-amber-900 hover:bg-amber-100'">
                {{ stage.status }}
              </Badge>
            </div>
          </div>
          <p v-else class="mb-0 text-sm text-slate-600">No pending deadlines in the current lifecycle view.</p>
        </CardContent>
      </Card>
    </div>

    <div class="lg:col-span-5">
      <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
        <CardHeader class="pb-2">
          <CardTitle class="text-base font-semibold text-slate-900">Owner Capacity Snapshot</CardTitle>
          <CardDescription>Open stage assignments by owner.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div
              v-for="owner in ownerLoad"
              :key="owner.name"
              class="flex items-center justify-between rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2"
            >
              <span class="text-sm text-slate-800">{{ owner.name }}</span>
              <Badge class="bg-pink-100 text-pink-900 hover:bg-pink-100">{{ owner.count }} open</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { CalendarClock, Hourglass, Users } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
