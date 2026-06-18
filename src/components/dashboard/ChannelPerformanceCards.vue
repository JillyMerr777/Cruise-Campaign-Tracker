<template>
  <Card class="h-full border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900">
        <ArrowLeftRight class="size-4 text-sky-600" />
      Channel Performance
      </CardTitle>
      <CardDescription>Comparative ranking across paid, social, video, email, and organic channels.</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="rankedChannels.length > 0">
        <div v-for="channel in rankedChannels" :key="channel.label" class="mb-3">
          <div class="mb-1 flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-slate-800">{{ channel.label }}</div>
              <div class="text-xs text-slate-500">CTR {{ channel.ctr.toFixed(2) }}% • {{ channel.conversions }} conversions</div>
            </div>
            <Badge class="bg-sky-100 text-sky-900 hover:bg-sky-100">Score {{ channel.score }}</Badge>
          </div>
          <Progress :model-value="channel.score" class="h-2 bg-sky-100 [&>*]:bg-sky-500" />
        </div>
      </div>
      <p v-else class="mb-0 text-sm text-slate-600">No channel metrics available for current filters.</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowLeftRight } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { ChannelMetric } from '../../types/metrics';

const props = defineProps<{ metrics: ChannelMetric[] }>();

const rankedChannels = computed(() => {
  const grouped = props.metrics.reduce<Record<string, { ctrSum: number; conversions: number; spend: number; revenue: number; count: number }>>((acc, metric) => {
    const current = acc[metric.channel] ?? { ctrSum: 0, conversions: 0, spend: 0, revenue: 0, count: 0 };

    acc[metric.channel] = {
      ctrSum: current.ctrSum + metric.ctr,
      conversions: current.conversions + metric.conversions,
      spend: current.spend + metric.spend,
      revenue: current.revenue + (metric.revenue ?? 0),
      count: current.count + 1
    };

    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([label, value]) => {
      const ctr = value.ctrSum / Math.max(value.count, 1);
      const roas = value.spend === 0 ? 0 : value.revenue / value.spend;
      const rawScore = ctr * 8 + value.conversions / 10 + roas * 25;

      return {
        label,
        ctr,
        conversions: value.conversions,
        score: Math.max(0, Math.min(100, Math.round(rawScore)))
      };
    })
    .sort((a, b) => b.score - a.score);
});
</script>
