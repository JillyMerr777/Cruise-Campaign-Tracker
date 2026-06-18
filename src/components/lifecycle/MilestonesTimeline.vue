<template>
  <v-card>
    <v-card-title>Milestones Timeline</v-card-title>
    <v-timeline density="compact" side="end">
      <v-timeline-item v-for="milestone in milestones" :key="milestone.title" dot-color="info" size="small">
        <div class="text-caption">{{ milestone.date }}</div>
        <div>{{ milestone.title }}</div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script setup lang="ts">
const milestones = [
  { date: 'Jul 01', title: 'Launch approved' },
  { date: 'Jul 03', title: 'Email wave #1 sent' },
  { date: 'Jul 07', title: 'Creative refresh added' },
  { date: 'Jul 10', title: 'Optimization checkpoint' }
];
</script>
