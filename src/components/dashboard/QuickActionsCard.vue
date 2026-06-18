<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-2 pb-4 pt-0">
      <RouterLink :to="'/campaigns/new'" :class="buttonVariants({ variant: 'default' }) + ' bg-cyan-500 text-white hover:bg-cyan-400'">
        <Plus class="mr-1 size-4" />
        Create Campaign
      </RouterLink>
      <Button variant="secondary" class="bg-sky-100 text-sky-900 hover:bg-sky-200">
        <Copy class="mr-1 size-4" />
        Duplicate
      </Button>
      <Button variant="secondary" class="bg-sky-100 text-sky-900 hover:bg-sky-200">
        <PauseCircle class="mr-1 size-4" />
        Pause
      </Button>
      <RouterLink :to="'/lifecycle'" :class="buttonVariants({ variant: 'secondary' }) + ' bg-pink-100 text-pink-900 hover:bg-pink-200'">
        <ChartLine class="mr-1 size-4" />
        Review Lifecycle
      </RouterLink>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ChartLine, Copy, PauseCircle, Plus } from '@lucide/vue';
import { RouterLink } from 'vue-router';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
</script>
