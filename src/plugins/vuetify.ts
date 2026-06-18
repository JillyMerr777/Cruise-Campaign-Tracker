import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const cruiseTheme = {
  dark: false,
  colors: {
    background: '#f4f9ff',
    surface: '#ffffff',
    'surface-bright': '#f6fbff',
    primary: '#2fcfd6',
    secondary: '#ff7fbf',
    accent: '#f2ff76',
    success: '#2acb9f',
    warning: '#ffb44f',
    error: '#f25c74',
    info: '#5ea7ff'
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
