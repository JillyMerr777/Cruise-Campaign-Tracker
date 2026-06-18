<template>
  <Card class="border-dashed border-sky-200/90 bg-sky-50/40 text-center shadow-none">
    <CardContent class="py-6">
      <Compass class="mx-auto mb-2 size-10 text-slate-400" />
      <p class="mb-0 text-sm text-slate-600">{{ message }}</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Compass } from '@lucide/vue';
import { Card, CardContent } from '@/components/ui/card';
defineProps<{ message: string }>();
</script>
