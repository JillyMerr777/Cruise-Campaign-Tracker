<template>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
    <Card
      v-for="metric in metrics"
      :key="metric.label"
      class="border-sky-100/60 bg-white/85 shadow-[0_10px_22px_rgba(41,71,125,0.1)] backdrop-blur-sm"
      size="sm"
    >
      <CardContent class="pt-3">
        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ metric.label }}</div>
        <div class="break-words text-lg font-semibold text-slate-900 sm:text-xl">{{ metric.value }}</div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
defineProps<{ metrics: Array<{ label: string; value: string | number }> }>();
</script>
