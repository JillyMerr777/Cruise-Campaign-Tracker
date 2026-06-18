<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Alerts</CardTitle>
    </CardHeader>
    <CardContent class="pb-4 pt-0">
      <div class="space-y-2">
        <div v-for="alert in alerts" :key="alert.id" class="flex gap-2 rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2">
          <component :is="icon(alert.type)" class="mt-0.5 size-4 text-amber-500" />
          <div>
            <div class="text-sm font-medium text-slate-800">{{ alert.title }}</div>
            <div class="text-xs text-slate-500">{{ alert.message }}</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { AlertCircle, AlertTriangle, CheckCircle2, Info, type LucideIcon } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AlertItem } from '../../types/alerts';

defineProps<{ alerts: AlertItem[] }>();

const icon = (type: AlertItem['type']): LucideIcon => {
  if (type === 'warning') return AlertTriangle;
  if (type === 'error') return AlertCircle;
  if (type === 'success') return CheckCircle2;
  return Info;
};
</script>
