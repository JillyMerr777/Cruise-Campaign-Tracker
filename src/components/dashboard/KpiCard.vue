<template>
  <Card class="kpi-card h-full border-slate-200 bg-white shadow-sm" size="sm">
    <CardContent class="flex h-full flex-col pb-3 pt-3.5">
      <div class="mb-2 flex items-start justify-between gap-2">
        <div class="min-h-9 max-w-[80%] flex items-start gap-1 text-[10.5px] font-semibold uppercase tracking-[0.045em] text-slate-500">
          <span class="line-clamp-2">{{ label }}</span>
          <TooltipProvider v-if="deltaContext">
            <Tooltip>
              <TooltipTrigger as-child>
                <button
                  type="button"
                  class="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  :aria-label="`${label} delta context`"
                >
                  <Info class="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>{{ deltaContext }}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <span :class="delta >= 0 ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/70'" class="inline-flex h-8 w-8 items-center justify-center rounded-full">
          <component :is="iconComponent" class="size-4" />
        </span>
      </div>

      <div class="mb-2 min-h-9 text-[1.82rem] leading-none font-bold tabular-nums tracking-tight text-slate-900">{{ value }}</div>

      <div class="mt-auto flex items-center justify-between gap-2">
        <MetricDelta :delta="delta" />
        <Badge
          class="text-[10.5px] font-semibold tracking-[0.015em]"
          :class="delta >= 0 ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80 hover:bg-emerald-50' : 'bg-rose-50 text-rose-800 ring-1 ring-rose-200/80 hover:bg-rose-50'"
        >
          {{ delta >= 0 ? 'Improving' : 'Declining' }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import {
  BarChart3,
  Banknote,
  CheckCircle2,
  Coins,
  Eye,
  HeartPulse,
  Image,
  Info,
  TrendingUp
} from '@lucide/vue';
import type { LucideIcon } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import MetricDelta from '../shared/MetricDelta.vue';

const props = defineProps<{ label: string; value: string; delta: number; deltaContext?: string; icon?: string }>();

const iconMap: Record<string, LucideIcon> = {
  'mdi-cash-multiple': Coins,
  'mdi-bank-outline': Banknote,
  'mdi-image-multiple-outline': Image,
  'mdi-heart-pulse': HeartPulse,
  'mdi-check-decagram-outline': CheckCircle2,
  'mdi-finance': TrendingUp,
  'mdi-chart-box-outline': BarChart3,
  'mdi-eye-outline': Eye
};

const iconComponent = computed<Component>(() => {
  if (!props.icon) return BarChart3;
  return iconMap[props.icon] ?? BarChart3;
});
</script>
