<template>
  <header class="app-topbar px-3 py-2">
    <div class="flex w-full flex-wrap items-center gap-3 md:flex-nowrap">
      <div class="topbar-brand flex items-center gap-2">
        <img class="brand-logo" :src="cruiseLogo" alt="SunWave Cruises logo" />
        <span class="topbar-brand-text font-bold">SunWave Cruise Intelligence</span>
      </div>

      <Badge class="topbar-context-chip bg-sky-100 text-sky-900 hover:bg-sky-100">
        <ChartLine class="mr-1 size-3.5" />
        {{ currentContext }}
      </Badge>

      <div class="hidden flex-1 md:block" />

      <div class="topbar-search relative">
        <Search class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input class="pl-8" aria-label="Search campaigns" placeholder="Search campaigns" />
      </div>

      <Button size="icon-sm" variant="ghost" aria-label="Open alerts"><Bell class="size-4" /></Button>
      <Button size="icon-sm" variant="ghost" aria-label="Open settings"><SlidersHorizontal class="size-4" /></Button>
      <div class="ml-1 grid size-[34px] place-items-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">AM</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { Bell, ChartLine, Search, SlidersHorizontal } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import cruiseLogo from '../../assets/Cruise_Logo.png';

const route = useRoute();

const currentContext = computed(() => {
  if (route.path.startsWith('/campaigns/new')) return 'Campaign Builder';
  if (route.path.startsWith('/lifecycle')) return 'Lifecycle Operations';
  if (route.path.startsWith('/campaigns/')) return 'Campaign Intelligence';
  return 'Executive Dashboard';
});
</script>
