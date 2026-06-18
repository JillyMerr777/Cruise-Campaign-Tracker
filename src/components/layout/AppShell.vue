<template>
  <v-app>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <AppTopBar />
    <AppNavDrawer />
    <PageContainer>
      <router-view />
    </PageContainer>
  </v-app>
</template>

<script setup lang="ts">
import AppNavDrawer from './AppNavDrawer.vue';
import AppTopBar from './AppTopBar.vue';
import PageContainer from './PageContainer.vue';
</script>
