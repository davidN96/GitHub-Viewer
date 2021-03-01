import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const store = new Store({
  state: {
    requests: {
      search: {
        quantity: 10,
        nextRequest: new Date(),
      },
      profile: {
        quantity: 60,
        nextRequest: new Date(),
      },
    },
  },
  mutations: {
    setRequestCount(state, { type, quantity }) {
      const { requests } = state;
      switch (type) {
        case 'search':
          return (requests.search.quantity = quantity);

        case 'profile':
          return (requests.profile.quantity = quantity);
      }
    },
    decrementRequestCount(state, type) {
      const { requests } = state;
      switch (type) {
        case 'search':
          if (requests.search.quantity > 0) requests.search.quantity--;
          break;

        case 'profile':
          if (requests.profile.quantity > 0) requests.profile.quantity--;
          break;
      }
    },
  },
});

export default store;
