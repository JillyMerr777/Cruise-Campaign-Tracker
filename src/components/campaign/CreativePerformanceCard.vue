<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Creative Performance</CardTitle>
    </CardHeader>
    <CardContent class="pb-4 pt-0">
      <div class="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div class="rounded-lg border border-sky-100/70 bg-sky-50/35 p-4">
          <div class="mb-1 text-xs text-slate-500">Top Creative</div>
          <div class="mb-1 text-sm font-semibold text-slate-900">Family Adventure Reel</div>
          <div class="mb-3 text-xs text-slate-500">CTR 3.9% • Conversions 460 • Revenue $182K</div>

          <div class="flex items-center gap-3">
            <div class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-sm font-semibold text-cyan-700 shadow-sm" :style="resonanceCircleStyle">
              <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white">89</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Resonance Score</div>
              <div class="text-sm font-medium text-slate-800">Top 8% of active creatives</div>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-sky-100/70 bg-sky-50/35 p-4">
          <div class="mb-1 text-xs text-slate-500">A/B Insight</div>
          <div class="mb-2 text-sm font-semibold text-slate-900">CTA "Book by Friday" outperformed by 18%</div>
          <div class="mb-3 text-xs text-slate-500">Recommendation: propagate variant B across Paid Social and Email.</div>

          <Badge class="bg-cyan-100 text-cyan-900 hover:bg-cyan-100">
            <TrendingUp class="mr-1 size-3.5" />
            +14% projected conversion lift
          </Badge>
        </div>
      </div>

      <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Creative Impact Metrics</div>

      <div class="mb-3">
        <div class="mb-1 flex justify-between text-xs text-slate-600">
          <span>Hook Strength</span>
          <span>84%</span>
        </div>
        <Progress :model-value="84" class="h-2 bg-sky-100 [&>*]:bg-cyan-500" />
      </div>

      <div class="mb-3">
        <div class="mb-1 flex justify-between text-xs text-slate-600">
          <span>Message Clarity</span>
          <span>78%</span>
        </div>
        <Progress :model-value="78" class="h-2 bg-sky-100 [&>*]:bg-pink-500" />
      </div>

      <div>
        <div class="mb-1 flex justify-between text-xs text-slate-600">
          <span>Conversion Impact</span>
          <span>81%</span>
        </div>
        <Progress :model-value="81" class="h-2 bg-sky-100 [&>*]:bg-emerald-500" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TrendingUp } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const resonanceCircleStyle = computed(() => ({
  background: 'conic-gradient(rgb(0 200 244) 0% 49%, rgb(255 79 162) 49% 89%, rgb(224 242 254) 89% 100%)'
}));
</script>
