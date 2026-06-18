<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Optimization Insights</CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="space-y-2">
        <li v-for="(insight, idx) in insights" :key="idx" class="flex gap-2 rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2">
          <Lightbulb class="mt-0.5 size-4 text-amber-500" />
          <span class="text-sm text-slate-700">{{ insight }}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Lightbulb } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
defineProps<{ insights: string[] }>();
</script>
