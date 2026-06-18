<template>
  <v-row>
    <v-col v-for="metric in metrics" :key="metric.label" cols="6" md="3">
      <v-card>
        <v-card-text>
          <div class="text-caption">{{ metric.label }}</div>
          <div class="text-h6">{{ metric.value }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{ metrics: Array<{ label: string; value: string | number }> }>();
</script>
