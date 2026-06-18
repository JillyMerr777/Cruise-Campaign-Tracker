<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Activity Feed</CardTitle>
    </CardHeader>
    <CardContent>
      <ol class="relative space-y-4 pl-5 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-sky-200/80">
        <li v-for="item in items" :key="item.id" class="relative">
          <span class="absolute -left-[17px] top-1.5 size-2.5 rounded-full bg-cyan-500" />
          <div class="text-xs text-slate-500">{{ new Date(item.time).toLocaleString() }}</div>
          <div class="text-sm text-slate-800">{{ item.message }}</div>
        </li>
      </ol>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
defineProps<{ items: Array<{ id: string; time: string; message: string }> }>();
</script>
