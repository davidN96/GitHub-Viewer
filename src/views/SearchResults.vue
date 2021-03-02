<template>
  <div class="searchResultsWrapper">
    <ErrorModal v-if="isCrashed" :title="errorTitle" :message="errorMessage" />
    <Loader v-if="fetchingData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Loader from '@/components/Loader/index.vue';
import UserTile from '@/components/UserTile/index.vue';
import { User, Repository } from '@/controllers/api/types';
import { UserSortQuery, Order } from '@/controllers/api/types';
import API from '@/controllers/api';

@Component({ components: { Loader, UserTile } })
export default class SearchResult extends Vue {
  private fetchingData: boolean = true;
  private mode: string = this.$route.params.mode;
  private data: Array<User | Repository> = [];
  private isCrashed: boolean = false;
  private errorTitle: string = '';
  private errorMessage: string = '';
  private errorRedirection: string = '';

  private decrementRequestCount(): void {
    this.$store.commit('decrementRequestCount', 'search');
  }

  private showError(title: string, message: string): void {
    this.isCrashed = true;
    this.errorTitle = title;
    this.errorMessage = message;
  }

  mounted() {
    this.decrementRequestCount();
  }
}
</script>

<style lang="scss" scoped>
.searchResultsWrapper {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  padding: 13vh 0;
  max-width: $xl-min;
}
</style>
