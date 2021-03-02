<template>
  <div class="searchResultsWrapper">
    <ErrorModal
      v-if="isCrashed"
      :title="errorTitle"
      :message="errorMessage"
      :redirectTo="errorRedirection"
    />
    <Loader v-if="fetchingData" />
    <div
      class="userList"
      v-if="mode === 'user'"
      :class="{ fadedIn: !fetchingData, fadedOut: fetchingData }"
    >
      <UserTile v-for="user of data" :user="user" :key="user.login" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Loader from '@/components/Loader/index.vue';
import UserTile from '@/components/UserTile/index.vue';
import * as APITypes from '@/controllers/api/types';
import API from '@/controllers/api';

@Component({ components: { Loader, UserTile } })
export default class SearchResult extends Vue {
  private fetchingData: boolean = true;
  private mode: string = this.$route.params.mode;
  private keyword: string = this.$route.params.keyword;
  private data: Array<APITypes.User | APITypes.Repository> = [];
  private isCrashed: boolean = false;
  private errorTitle: string = '';
  private errorMessage: string = '';
  private errorRedirection: string = '';
  private perPage: number = 10;
  private page: number = 1;
  private resultsCount: number = 0;

  private get searchCount(): number {
    return this.$store.state.requests.search.count;
  }

  private get profileCount(): number {
    return this.$store.state.requests.profile.count;
  }

  private decrementRequestCount(): void {
    this.$store.commit('decrementRequestCount', 'search');
  }

  private showLoader(): void {
    this.fetchingData = true;
  }

  private hideLoader(): void {
    setTimeout(() => (this.fetchingData = false), 300);
  }

  private showError(title: string, message: string): void {
    this.isCrashed = true;
    this.errorTitle = title;
    this.errorMessage = message;
    this.errorRedirection = '/';
  }

  private async searchUser(): Promise<APITypes.FindUserResponse> {
    const params: APITypes.FindUserParams = {
      q: this.keyword,
      page: this.page,
      per_page: this.perPage,
      order: APITypes.Order.asc,
      sort: APITypes.UserSortQuery.joined,
    };

    const data: APITypes.FindUserResponse = await API.findUser(params);

    return data;
  }

  private async searchRepository(): Promise<APITypes.FindRepositoryResponse> {
    const params: APITypes.FindRepositoryParams = {
      q: this.keyword,
      page: this.page,
      per_page: this.perPage,
      order: APITypes.Order.asc,
      sort: APITypes.RepositorySortQuery.stars,
    };

    return await API.findRepository(params);
  }

  async mounted(): Promise<void> {
    this.decrementRequestCount();

    try {
      const data =
        this.mode === 'user'
          ? await this.searchUser()
          : await this.searchRepository();

      this.resultsCount = data.total_count;
      this.data = data.items;
      this.hideLoader();
    } catch (error) {
      console.log(error);
      if (error.status === 403) this.showError('Sorry', 'API limit exceeded');
      else this.showError('Sorry', 'API error ocurred');
    }
  }
}
</script>

<style lang="scss" scoped>
.searchResultsWrapper {
  display: flex;
  width: 100vw;
  margin-top: 5vh;
  padding: 5vh 10vw;
  justify-content: center;

  @include sm() {
    margin-top: 7vh;
  }

  .userList {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    flex-wrap: wrap;
    max-width: $xl-min;
  }
}
</style>
