<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Channel Metrics</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs v-model="tab" class="w-full">
        <TabsList class="-mx-1 mb-3 w-full justify-start gap-1 overflow-x-auto whitespace-nowrap rounded-lg bg-sky-100/60 p-1">
          <TabsTrigger
            v-for="metric in metrics"
            :key="metric.channel"
            :value="metric.channel"
            class="shrink-0 rounded-md px-3 text-xs data-[state=active]:bg-cyan-500 data-[state=active]:text-white sm:text-sm"
          >
            {{ metric.channel }}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="metric in metrics"
          :key="metric.channel"
          :value="metric.channel"
          class="rounded-lg border border-sky-100/70 bg-sky-50/30 p-3 sm:p-4"
        >
          <div class="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2 sm:gap-2">
            <div><span class="text-slate-500">Impressions:</span> <strong class="text-slate-800">{{ metric.impressions }}</strong></div>
            <div><span class="text-slate-500">Clicks:</span> <strong class="text-slate-800">{{ metric.clicks }}</strong></div>
            <div><span class="text-slate-500">CTR:</span> <strong class="text-slate-800">{{ metric.ctr }}%</strong></div>
            <div><span class="text-slate-500">Conversions:</span> <strong class="text-slate-800">{{ metric.conversions }}</strong></div>
            <div class="sm:col-span-2"><span class="text-slate-500">Spend:</span> <strong class="text-slate-800">{{ metric.spend }}</strong></div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ChannelMetric } from '../../types/metrics';

const props = defineProps<{ metrics: ChannelMetric[] }>();
const tab = ref(props.metrics[0]?.channel || '');
</script>
