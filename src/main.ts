import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'

import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import { Vuetify3Dialog } from 'vuetify3-dialog'

// import { fakeBackend } from '@/utils/helpers/fake-backend';

// print
import print from 'vue3-print-nb';
import i18n from './plugins/i18n';

const app = createApp(App);
// fakeBackend();
app.use(router);
app.use(i18n);
app.use(PerfectScrollbarPlugin);
app.use(createPinia());
app.use(VueTablerIcons);

app.use(print);
app.use(VueApexCharts);
app.use(vuetify);
app.use(Vuetify3Dialog);
app.mount('#app');
