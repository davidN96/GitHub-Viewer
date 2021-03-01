import { mount } from '@vue/test-utils';
import Loader from './index.vue';

test('Loader', () => {
  const title: string = 'Hello';
  const wrapper = mount(Loader, { propsData: { title } });

  expect(wrapper.text()).toContain(title);
});
