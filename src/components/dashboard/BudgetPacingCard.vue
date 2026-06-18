<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Budget Pacing</CardTitle>
    </CardHeader>
    <CardContent class="pb-4 pt-0">
      <div class="mb-2 flex justify-between text-sm">
        <span>Spend</span>
        <strong>{{ spendLabel }} / {{ budgetLabel }}</strong>
      </div>
      <Progress :model-value="pace" class="h-3 bg-sky-100 [&>*]:bg-amber-400" />
      <p class="mt-2 text-xs text-slate-500">{{ pace.toFixed(1) }}% of budget consumed</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '../../utils/formatters';

const props = defineProps<{ spend: number; budget: number }>();

const pace = computed(() => (props.budget === 0 ? 0 : (props.spend / props.budget) * 100));
const spendLabel = computed(() => formatCurrency(props.spend));
const budgetLabel = computed(() => formatCurrency(props.budget));
</script>
