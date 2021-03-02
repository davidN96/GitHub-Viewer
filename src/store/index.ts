import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const store = new Store({
  state: {
    requests: {
      search: {
        quantity: 10,
        nextRequest: undefined,
      },
      profile: {
        quantity: 60,
        nextRequest: undefined,
      },
    },
  },
  mutations: {
    setRequestDate(state, { type, date }) {
      switch (type) {
        case 'search':
          state.requests.search.nextRequest = date;
          break;

        case 'profile':
          state.requests.profile.nextRequest = date;
          break;
      }
    },
    setRequestCount(state, { type, quantity, reset }) {
      const { requests } = state;
      switch (type) {
        case 'search':
          requests.search.nextRequest = reset;
          return (requests.search.quantity = quantity);

        case 'profile':
          requests.profile.nextRequest = reset;
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
