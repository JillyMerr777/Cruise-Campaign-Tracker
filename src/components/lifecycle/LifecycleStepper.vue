<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Lifecycle Progress Map</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex gap-2 overflow-x-auto pb-1">
        <div
          v-for="(step, index) in steps"
          :key="step"
          :class="[
            'whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium',
            index < activeStep ? 'bg-cyan-500 text-white' : 'bg-sky-100 text-slate-700'
          ]"
        >
          {{ index + 1 }}. {{ step }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = ['Briefing', 'Planning', 'Copy', 'Design', 'Approval', 'Launch', 'QA', 'Monitor', 'Optimize', 'Complete'];
const activeStep = 6;
</script>
