import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/_reset.scss';
import { unifyDate, unifyTime } from '@/utils/date';
import ErrorModal from '@/components/ErrorModal/index.vue';
import Loader from '@/components/Loader/index.vue';
import Paginator from '@/components/Paginator/index.vue';
import SearchFilters from '@/components/SearchFilters/index.vue';
import ResultsCounter from '@/components/ResultsCounter/index.vue';
import PreviewSection from '@/components/PreviewSection/index.vue';
import PreviewList from '@/components/PreviewList/index.vue';

Vue.config.productionTip = false;

Vue.filter(
  'capitalize',
  (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
);

Vue.filter('removeSpecialChars', (text: string) => {
  text = text.replace(/[^a-zA-Z ]/g, ' ');
  return text;
});

Vue.filter('unifyDate', (datetime: Date): string => unifyDate(datetime));
Vue.filter('unifyTime', (datetime: Date): string => unifyTime(datetime));

Vue.component('ErrorModal', ErrorModal);
Vue.component('Loader', Loader);
Vue.component('Paginator', Paginator);
Vue.component('SearchFilters', SearchFilters);
Vue.component('ResultsCounter', ResultsCounter);
Vue.component('PreviewSection', PreviewSection);
Vue.component('PreviewList', PreviewList);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
