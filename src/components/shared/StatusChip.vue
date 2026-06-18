<template>
  <Badge :class="chipClass">
    <component :is="icon" class="mr-1 size-3.5" />
    {{ label }}
  </Badge>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { AlertCircle, AlertOctagon, CheckCircle2, Info } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';

const props = defineProps<{ label: string }>();

const chipClass = computed(() => {
  if (props.label.includes('Well') || props.label.includes('Active')) return 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100';
  if (props.label.includes('Attention') || props.label.includes('Paused')) return 'bg-amber-100 text-amber-900 hover:bg-amber-100';
  if (props.label.includes('Under')) return 'bg-rose-100 text-rose-900 hover:bg-rose-100';
  return 'bg-sky-100 text-sky-900 hover:bg-sky-100';
});

const icon = computed<Component>(() => {
  if (props.label.includes('Well') || props.label.includes('Active')) return CheckCircle2;
  if (props.label.includes('Attention') || props.label.includes('Paused')) return AlertCircle;
  if (props.label.includes('Under')) return AlertOctagon;
  return Info;
});
</script>
