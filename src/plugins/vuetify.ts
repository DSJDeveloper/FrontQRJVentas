import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { icons } from './mdi-icon'; // Import icons from separate file
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { PurpleTheme } from '@/theme/LightTheme';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      ...icons
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'PurpleTheme',
    themes: {
      PurpleTheme,

    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'sm',
      density: "compact",
      color: "primary",
      variant: "outlined"
    },
    VDateInput: {
      rounded: 'sm',
      density: "compact",
      color: "primary",
      variant: "outlined"
    },
    VTooltip: {
      // set v-tooltip default location to top
      location: 'top',
    },
    VDataTableServer: {
      hover: true,
      fixedHeader:true
    },
    VDataTable: {
      hover: true
    }
  }
});
