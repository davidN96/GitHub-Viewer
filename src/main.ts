import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/_reset.scss';
import { DateTime } from '@/global';

Vue.config.productionTip = false;

Vue.filter(
  'capitalize',
  (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
