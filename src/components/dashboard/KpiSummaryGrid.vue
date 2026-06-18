<template>
  <v-row class="mt-1" dense>
    <v-col v-for="item in items" :key="item.label" cols="12" sm="6" lg="4" xl="2">
      <KpiCard
        :label="item.label"
        :value="item.value"
        :delta="item.delta"
        :delta-context="item.deltaContext"
        :icon="item.icon"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import KpiCard from './KpiCard.vue';

defineProps<{ items: Array<{ label: string; value: string; delta: number; deltaContext?: string; icon?: string }> }>();
</script>
