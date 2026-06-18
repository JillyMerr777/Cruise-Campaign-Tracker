<template>
  <div class="app-shell min-h-screen py-3 md:py-5">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="app-frame mx-auto max-w-[1540px] px-2 md:px-4">
      <AppTopBar />
      <div class="pb-3">
        <div class="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
        <AppNavDrawer class="shrink-0" />
        <div class="min-w-0 flex-1">
          <PageContainer>
            <router-view />
          </PageContainer>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavDrawer from './AppNavDrawer.vue';
import AppTopBar from './AppTopBar.vue';
import PageContainer from './PageContainer.vue';
</script>
