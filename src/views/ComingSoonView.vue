<template>
  <div class="rounded-2xl border border-cyan-100/70 bg-white/90 p-5 shadow-[0_16px_36px_rgba(17,48,105,0.09)] backdrop-blur-sm md:p-7">
    <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-900">
      New section
    </div>
    <h1 class="text-2xl font-bold text-slate-900 md:text-3xl">{{ sectionTitle }}</h1>
    <p class="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
      Coming soon... We are actively building this experience so you can access deeper insights from this area.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const sectionTitle = computed(() => {
  const title = route.meta.title;
  return typeof title === 'string' ? title : 'Coming Soon';
});
</script>
