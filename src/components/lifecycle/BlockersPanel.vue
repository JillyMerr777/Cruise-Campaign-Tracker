<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Blockers & Risks</CardTitle>
    </CardHeader>
    <CardContent>
      <ul class="space-y-2">
        <li class="flex gap-2 rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2">
          <AlertTriangle class="mt-0.5 size-4 text-amber-500" />
          <div>
            <div class="text-sm font-medium text-slate-800">Legal review pending</div>
            <div class="text-xs text-slate-500">Delays launch of luxury segment variant by 1 day</div>
          </div>
        </li>
        <li class="flex gap-2 rounded-lg border border-sky-100/70 bg-sky-50/30 px-3 py-2">
          <AlertTriangle class="mt-0.5 size-4 text-amber-500" />
          <div>
            <div class="text-sm font-medium text-slate-800">Mobile QA issue</div>
            <div class="text-xs text-slate-500">Promo tile clipping on iPhone mini viewport</div>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
</script>
