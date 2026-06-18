<template>
  <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
    <div v-for="item in items" :key="item.label" class="h-full">
      <KpiCard
        :label="item.label"
        :value="item.value"
        :delta="item.delta"
        :delta-context="item.deltaContext"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiCard from './KpiCard.vue';

defineProps<{ items: Array<{ label: string; value: string; delta: number; deltaContext?: string; icon?: string }> }>();
</script>
