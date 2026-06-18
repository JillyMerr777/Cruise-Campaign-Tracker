<template>
  <v-row class="mt-1">
    <v-col v-for="item in items" :key="item.label" cols="12" sm="6" lg="2">
      <KpiCard :label="item.label" :value="item.value" :delta="item.delta" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import KpiCard from './KpiCard.vue';

defineProps<{ items: Array<{ label: string; value: string; delta: number }> }>();
</script>
