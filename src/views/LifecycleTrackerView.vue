<template>
  <div class="mb-4">
    <h1 class="page-title">Campaign Lifecycle Tracker</h1>
    <p class="page-subtitle">Visualize campaign execution from briefing through optimization and archive.</p>
  </div>

  <FilterBar v-model="filters" />

  <LifecycleStepper class="mb-4" />

  <v-row>
    <v-col cols="12" lg="6"><LifecycleStageCard :stages="stages" /></v-col>
    <v-col cols="12" lg="6"><DeliverablesChecklist /></v-col>
    <v-col cols="12" lg="6"><MilestonesTimeline /></v-col>
    <v-col cols="12" lg="6"><BlockersPanel /></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BlockersPanel from '../components/lifecycle/BlockersPanel.vue';
import DeliverablesChecklist from '../components/lifecycle/DeliverablesChecklist.vue';
import LifecycleStageCard from '../components/lifecycle/LifecycleStageCard.vue';
import LifecycleStepper from '../components/lifecycle/LifecycleStepper.vue';
import MilestonesTimeline from '../components/lifecycle/MilestonesTimeline.vue';
import FilterBar from '../components/shared/FilterBar.vue';
import { dataService } from '../services/dataService';

const filters = reactive({ channel: 'All', status: 'All', destination: 'All', segment: '' });
const stages = dataService.lifecycle[0]?.stages ?? [];
</script>
