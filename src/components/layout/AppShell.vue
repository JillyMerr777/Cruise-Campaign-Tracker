<template>
  <div class="app-shell min-h-screen py-3 md:py-5">
    <div class="app-shell-art" :class="{ 'app-shell-art-hidden': !showShellLogo }" aria-hidden="true">
      <img class="app-shell-art-logo" :src="cruiseLogo" alt="" />
    </div>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div class="app-frame relative z-10 mx-auto max-w-[1540px] px-2 md:px-4">
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AppNavDrawer from './AppNavDrawer.vue';
import AppTopBar from './AppTopBar.vue';
import PageContainer from './PageContainer.vue';
import cruiseLogo from '../../assets/Cruise_Logo.png';

const showShellLogo = ref(true);
const isMobileViewport = ref(false);

const evaluateViewport = (): void => {
  isMobileViewport.value = window.matchMedia('(max-width: 768px)').matches;
};

const updateLogoVisibility = (): void => {
  if (!isMobileViewport.value) {
    showShellLogo.value = true;
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  const atBottom = scrollTop + viewportHeight >= docHeight - 28;

  showShellLogo.value = scrollTop < 18 || atBottom;
};

const handleResize = (): void => {
  evaluateViewport();
  updateLogoVisibility();
};

const handleScroll = (): void => {
  updateLogoVisibility();
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
});
</script>
