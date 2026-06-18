<template>
  <v-stepper alt-labels :items="steps" hide-actions />
</template>

<script setup lang="ts">
const steps = ['Briefing', 'Planning', 'Copy', 'Design', 'Approval', 'Launch', 'QA', 'Monitor', 'Optimize', 'Complete'];
</script>
