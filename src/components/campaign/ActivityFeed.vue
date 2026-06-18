<template>
  <v-card>
    <v-card-title>Activity Feed</v-card-title>
    <v-timeline density="compact" align="start">
      <v-timeline-item v-for="item in items" :key="item.id" dot-color="primary" size="small">
        <div class="text-caption">{{ new Date(item.time).toLocaleString() }}</div>
        <div>{{ item.message }}</div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ items: Array<{ id: string; time: string; message: string }> }>();
</script>
