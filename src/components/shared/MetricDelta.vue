<template>
  <span :class="delta >= 0 ? 'text-emerald-600' : 'text-rose-600'" class="inline-flex items-center gap-1 text-xs font-semibold tabular-nums">
    <TrendingUp v-if="delta >= 0" class="size-3.5" />
    <TrendingDown v-else class="size-3.5" />
    {{ delta >= 0 ? '+' : '' }}{{ delta.toFixed(1) }}%
  </span>
</template>

<script setup lang="ts">
import { TrendingDown, TrendingUp } from '@lucide/vue';
defineProps<{ delta: number }>();
</script>
