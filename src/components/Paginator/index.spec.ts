import Paginator from './index.vue';
import { mount } from '@vue/test-utils';

describe('Paginator', () => {
  const props = {
    page: 1,
    maxPage: 2,
  };

  const wrapper = mount(Paginator, { propsData: props });

  expect(wrapper.props().page).toBe(props.page);
  expect(wrapper.props().maxPage).toBe(props.maxPage);
});
