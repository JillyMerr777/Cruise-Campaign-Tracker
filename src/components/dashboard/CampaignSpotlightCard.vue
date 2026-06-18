<template>
  <Card class="card-glow border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <span>Campaign Spotlight</span>
      <HealthStatusBadge :health="campaign.health" />
    </CardHeader>
    <CardContent class="pb-4 pt-0">
      <h3 class="mb-1 text-2xl font-semibold text-slate-900">{{ campaign.name }}</h3>
      <p class="mb-3 text-sm text-slate-600">{{ campaign.objective }}</p>
      <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div><div class="text-xs text-slate-500">Destination</div><div class="text-sm font-medium text-slate-800">{{ campaign.destination }}</div></div>
        <div><div class="text-xs text-slate-500">Owner</div><div class="text-sm font-medium text-slate-800">{{ campaign.owner }}</div></div>
        <div><div class="text-xs text-slate-500">ROI</div><div class="text-sm font-medium text-slate-800">{{ campaign.roi }}x</div></div>
        <div><div class="text-xs text-slate-500">CTR</div><div class="text-sm font-medium text-slate-800">{{ campaign.ctr }}%</div></div>
      </div>
      <div class="mt-3 flex gap-2">
        <RouterLink :to="`/campaigns/${campaign.id}`" :class="buttonVariants({ variant: 'default' }) + ' bg-cyan-500 text-white hover:bg-cyan-400'">Open Details</RouterLink>
        <RouterLink :to="'/lifecycle'" :class="buttonVariants({ variant: 'secondary' }) + ' bg-pink-100 text-pink-900 hover:bg-pink-200'">Lifecycle</RouterLink>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import HealthStatusBadge from './HealthStatusBadge.vue';
import type { Campaign } from '../../types/campaign';

defineProps<{ campaign: Campaign }>();
</script>
