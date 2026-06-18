<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Past Campaign Highlights</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-2">
        <div v-for="campaign in completed" :key="campaign.id" class="rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2">
          <div class="text-sm font-medium text-slate-800">{{ campaign.name }}</div>
          <div class="text-xs text-slate-500">ROI {{ campaign.roi }}x • {{ campaign.destination }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Campaign } from '../../types/campaign';

const props = defineProps<{ campaigns: Campaign[] }>();
const completed = computed(() => props.campaigns.filter((c) => c.status === 'Completed'));
</script>
