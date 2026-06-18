import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const cruiseTheme = {
  dark: true,
  colors: {
    background: '#07101f',
    surface: '#111c31',
    'surface-bright': '#192848',
    primary: '#2de2e6',
    secondary: '#ff6ec7',
    accent: '#f4ff52',
    success: '#5df4a4',
    warning: '#ffb44f',
    error: '#ff5f8f',
    info: '#55a7ff'
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
      elevation: 8
    }
  }
});
