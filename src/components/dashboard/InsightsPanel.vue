<template>
  <v-card>
    <v-card-title>Optimization Insights</v-card-title>
    <v-list lines="two" density="comfortable">
      <v-list-item v-for="(insight, idx) in insights" :key="idx" prepend-icon="mdi-lightbulb-on-outline">
        <v-list-item-title>{{ insight }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ insights: string[] }>();
</script>
