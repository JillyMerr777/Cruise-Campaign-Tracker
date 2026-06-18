<template>
  <header class="app-topbar px-3 py-2">
    <div class="flex w-full flex-wrap items-center gap-3 md:flex-nowrap">
      <div class="topbar-brand flex items-center gap-2">
        <img class="brand-logo" :src="cruiseLogo" alt="SunWave Cruises logo" />
        <span class="topbar-brand-text font-bold">SunWave Cruise Intelligence</span>
      </div>

      <Badge class="topbar-context-chip bg-slate-100 text-slate-700 hover:bg-slate-100">
        <ChartLine class="mr-1 size-3.5" />
        {{ currentContext }}
      </Badge>

      <div class="hidden flex-1 lg:block" />

      <div class="topbar-search relative">
        <Search class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input class="pl-8" aria-label="Search campaigns" placeholder="Search campaigns" />
      </div>

      <div class="topbar-actions flex items-center gap-1.5">
        <Button variant="outline" size="sm" class="hidden h-8 lg:inline-flex">
          <CalendarRange class="mr-1 size-3.5" />
          May 15 - May 21, 2024
        </Button>
        <Button variant="outline" size="sm" class="hidden h-8 md:inline-flex">
          <SlidersHorizontal class="mr-1 size-3.5" />
          Filter
        </Button>
        <Button size="icon-sm" variant="outline" class="h-8 w-8" aria-label="Refresh dashboard"><RotateCcw class="size-4" /></Button>
        <RouterLink :to="'/campaigns/new'" :class="buttonVariants({ size: 'sm' }) + ' h-8 bg-blue-600 px-3 text-white hover:bg-blue-500'">
          <Plus class="mr-1 size-3.5" />
          New Campaign
        </RouterLink>
        <Button size="icon-sm" variant="ghost" class="h-8 w-8" aria-label="Open alerts"><Bell class="size-4" /></Button>
        <div class="ml-1 grid size-[34px] place-items-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">AM</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Bell, CalendarRange, ChartLine, Plus, RotateCcw, Search, SlidersHorizontal } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
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
