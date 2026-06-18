<template>
  <StatusChip :label="health" />
</template>

<script setup lang="ts">
import StatusChip from '../shared/StatusChip.vue';
defineProps<{ health: string }>();
</script>
