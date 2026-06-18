import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const cruiseTheme = {
  dark: false,
  colors: {
    background: '#edf4ff',
    surface: '#ffffff',
    'surface-bright': '#f6faff',
    primary: '#00a8b9',
    secondary: '#ff5fa2',
    accent: '#ffe66e',
    success: '#24c99a',
    warning: '#ffaf45',
    error: '#e94f64',
    info: '#2f80ed'
  }
};

export default createVuetify({
  theme: {
    defaultTheme: 'cruiseTheme',
    themes: { cruiseTheme }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  defaults: {
    VCard: {
      rounded: 'xl',
      elevation: 0
    }
  }
});
