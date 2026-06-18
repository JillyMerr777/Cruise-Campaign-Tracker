<template>
  <aside
    class="app-drawer app-drawer-shell"
    :class="rail ? 'w-[84px]' : 'w-[280px]'"
    aria-label="Primary navigation"
  >
    <div class="drawer-header px-3 py-3">
      <div class="flex items-center justify-between">
        <div class="drawer-brand flex items-center gap-2">
          <img class="drawer-logo" :src="cruiseLogo" alt="SunWave Cruises logo" />
          <div>
            <div v-if="!rail" class="text-xs font-bold text-slate-800">SunWave Cruises</div>
            <div v-if="!rail" class="text-xs text-slate-500">Marketing Operations Hub</div>
          </div>
        </div>
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          :aria-label="rail ? 'Expand navigation' : 'Collapse navigation'"
          @click="rail = !rail"
        >
          <ChevronsRight v-if="rail" class="size-4" />
          <ChevronsLeft v-else class="size-4" />
        </button>
      </div>
    </div>

    <nav class="app-drawer-nav flex flex-col gap-1 px-2 py-2">
      <component
        :is="item.disabled ? 'button' : RouterLink"
        v-for="item in items"
        :key="item.title"
        :to="item.disabled ? undefined : item.to"
        type="button"
        :disabled="item.disabled"
        :title="rail ? `${item.title} - ${item.description}` : undefined"
        :aria-label="item.disabled ? `${item.title} coming soon` : `Go to ${item.title}`"
        class="group flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-left transition"
        :class="[
          item.disabled
            ? 'cursor-not-allowed border-transparent bg-transparent text-slate-400 opacity-75'
            : isActive(item.to)
              ? 'border-cyan-200 bg-cyan-100/60 text-slate-900 shadow-sm'
              : 'border-transparent text-slate-700 hover:border-sky-200 hover:bg-sky-50',
          rail ? 'justify-center' : ''
        ]"
      >
        <component :is="item.icon" class="size-4 shrink-0" />
        <template v-if="!rail">
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm font-medium">{{ item.title }}</div>
            <div class="truncate text-xs text-slate-500">{{ item.description }}</div>
          </div>
          <span
            v-if="item.disabled"
            class="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700"
          >
            Soon
          </span>
        </template>
      </component>
    </nav>

    <div class="drawer-footer mt-auto p-3">
      <div class="rounded-lg border border-sky-100/80 bg-white/70 p-2">
        <div class="flex items-center gap-2">
          <div class="grid size-9 place-items-center rounded-full bg-pink-100 text-xs font-bold text-pink-700">AM</div>
          <div v-if="!rail" class="min-w-0 flex-1">
            <div class="truncate text-sm font-medium text-slate-800">Ava Martinez</div>
            <div class="truncate text-xs text-slate-500">Senior Marketing Analyst</div>
          </div>
          <button
            type="button"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut class="size-4" />
          </button>
        </div>
        <button
          v-if="!rail"
          type="button"
          class="mt-2 inline-flex w-full items-center justify-center gap-1 rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          aria-label="Sign out"
        >
          <LogOut class="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {
  ChartLine,
  ChevronsLeft,
  ChevronsRight,
  Cog,
  LayoutDashboard,
  LogOut,
  PlusSquare,
  Users
} from '@lucide/vue';
import type { Component } from 'vue';
import cruiseLogo from '../../assets/Cruise_Logo.png';

const route = useRoute();
const rail = ref(false);

const handleViewport = (): void => {
  rail.value = window.matchMedia('(max-width: 960px)').matches;
};

onMounted(() => {
  handleViewport();
  window.addEventListener('resize', handleViewport);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleViewport);
});

type NavItem = {
  to?: string;
  title: string;
  icon: Component;
  description: string;
  disabled: boolean;
};

const isActive = (to?: string): boolean => {
  if (!to) return false;
  if (to === '/') return route.path === '/';
  return route.path.startsWith(to);
};

const items: NavItem[] = [
  {
    to: '/',
    title: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Campaign performance overview.',
    disabled: false
  },
  {
    to: '/campaigns/new',
    title: 'Campaigns',
    icon: PlusSquare,
    description: 'Manage and optimize campaigns.',
    disabled: false
  },
  {
    to: '/lifecycle',
    title: 'Analytics',
    icon: ChartLine,
    description: 'Performance reporting and stage insights.',
    disabled: false
  },
  {
    to: undefined,
    title: 'Audiences',
    icon: Users,
    description: 'Customer segments and reach analysis.',
    disabled: true
  },
  {
    to: undefined,
    title: 'Settings',
    icon: Cog,
    description: 'Platform configuration.',
    disabled: true
  }
];
</script>
