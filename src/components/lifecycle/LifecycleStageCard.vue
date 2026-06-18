<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Stage Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-2">
        <div
          v-for="stage in stages"
          :key="stage.name"
          class="flex items-center justify-between rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2"
        >
          <div>
            <div class="text-sm font-medium text-slate-800">{{ stage.name }}</div>
            <div class="text-xs text-slate-500">Owner: {{ stage.owner || 'TBD' }} • Due {{ stage.dueDate || 'TBD' }}</div>
          </div>
          <StatusChip :label="stage.status" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { LifecycleStage } from '../../types/lifecycle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusChip from '../shared/StatusChip.vue';
defineProps<{ stages: LifecycleStage[] }>();
</script>
