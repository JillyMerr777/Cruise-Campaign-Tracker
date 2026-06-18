import { useDisplay } from 'vuetify';

export const useResponsiveLayout = () => {
  const display = useDisplay();
  return {
    isMobile: display.smAndDown,
    isTablet: display.md,
    isDesktop: display.lgAndUp
  };
};
