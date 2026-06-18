<template>
  <v-card>
    <v-card-title>Stage Status</v-card-title>
    <v-list>
      <v-list-item v-for="stage in stages" :key="stage.name" :title="stage.name" :subtitle="`Owner: ${stage.owner || 'TBD'} • Due ${stage.dueDate || 'TBD'}`">
        <template #append>
          <StatusChip :label="stage.status" />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { LifecycleStage } from '../../types/lifecycle';
import StatusChip from '../shared/StatusChip.vue';
defineProps<{ stages: LifecycleStage[] }>();
</script>
