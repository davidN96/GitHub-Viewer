import { mount } from '@vue/test-utils';
import LoaderIndicator from './index.vue';

test('It should be mounted', () => {
  const wrapper = mount(LoaderIndicator);

  expect(wrapper.find('.indicatorWrapper').exists()).toBeTruthy();
});
