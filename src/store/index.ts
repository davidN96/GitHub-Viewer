import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const store = new Store({
  state: {
    requests: {
      search: 10,
      profile: 60,
    },
  },
  mutations: {
    decrementRequestCount(state, type) {
      const { requests } = state;
      switch (type) {
        case 'search':
          if (requests.search > 0) requests.search--;
          break;

        case 'profile':
          if (requests.profile > 0) requests.profile--;
          break;
      }
    },
  },
});

export default store;
