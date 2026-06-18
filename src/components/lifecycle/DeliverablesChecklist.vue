<template>
  <v-card>
    <v-card-title>Deliverables Checklist</v-card-title>
    <v-card-text>
      <v-checkbox v-for="item in items" :key="item" :label="item" density="compact" hide-details />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const items = ['Approved brief', 'Channel plan', 'Creative package', 'QA sign-off', 'Launch runbook'];
</script>
