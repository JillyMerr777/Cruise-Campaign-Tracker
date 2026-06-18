<template>
  <Card class="mb-4 border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardContent class="flex flex-wrap items-center justify-between gap-3 pt-4">
      <div>
        <h1 class="page-title text-2xl font-bold text-slate-900">{{ campaign.name }}</h1>
        <p class="page-subtitle mb-0 text-slate-600">{{ campaign.objective }}</p>
      </div>
      <StatusChip :label="campaign.health" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import type { Campaign } from '../../types/campaign';
import StatusChip from '../shared/StatusChip.vue';
defineProps<{ campaign: Campaign }>();
</script>
