<template>
  <v-card variant="outlined" class="text-center pa-6">
    <v-icon size="42" icon="mdi-compass-off-outline" class="mb-2" />
    <p class="text-body-1 mb-0">{{ message }}</p>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>
