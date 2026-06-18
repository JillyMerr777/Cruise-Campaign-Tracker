<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Deliverables Checklist</CardTitle>
    </CardHeader>
    <CardContent>
      <label
        v-for="item in items"
        :key="item"
        class="mb-2 flex cursor-pointer items-center gap-2 rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2 last:mb-0"
      >
        <input
          v-model="selectedItems"
          type="checkbox"
          :value="item"
          class="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
        />
        <span class="text-sm text-slate-700">{{ item }}</span>
      </label>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const items = ['Approved brief', 'Channel plan', 'Creative package', 'QA sign-off', 'Launch runbook'];
const selectedItems = ref<string[]>([]);
</script>
