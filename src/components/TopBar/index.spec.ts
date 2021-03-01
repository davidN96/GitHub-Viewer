import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import TopBar from './index.vue';
import router from '@/router';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

test('TopBar', () => {
  const wrapper = shallowMount(TopBar, { localVue, router });
  expect(wrapper.find('.topBar_wrapper').exists()).toBeTruthy();
});
