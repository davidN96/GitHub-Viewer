<template>
  <div class="searchResultsWrapper">
    <ErrorModal
      v-if="isCrashed"
      :title="errorTitle"
      :message="errorMessage"
      :redirectTo="errorRedirection"
    />
    <Loader :isActive="fetchingData" />
    <div
      class="list"
      :class="{ fadedIn: !fetchingData, fadedOut: fetchingData }"
    >
      <SearchFilters
        :perPageOptions="perPageOptions"
        :sortOptions="sortOptions"
        :results="resultsCount"
        @filtersChange="handleFiltersChange"
      />
      <ItemTile
        v-for="item of data"
        :item="item"
        :key="item.node_id"
        :type="mode"
      />
      <Paginator
        :page="page"
        :maxPage="this.maxPage"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { SearchMode, SearchFilters } from '@/global';
import ItemTile from '@/components/ItemTile/index.vue';
import * as APITypes from '@/controllers/api/types';
import * as Search from '@/utils/search';
import API from '@/controllers/api';
import { scrollTop } from '@/utils/view';

@Component({ components: { ItemTile } })
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
  private resultsCount: number = 0;
  private maxPage: number = 0;
  private perPageOptions: number[] = [10, 20, 30, 40, 50];
  private order: string = 'desc';
  private page: number = parseInt(this.$route.params.page);

  private sortOptions: string[] =
    this.mode === SearchMode.user
      ? Object.values(APITypes.UserSortQuery)
      : Object.keys(APITypes.RepositorySortQuery);

  private sortBy: string =
    this.mode === SearchMode.user
      ? APITypes.UserSortQuery.repositories
      : APITypes.RepositorySortQuery.stars;

  private handlePageChange(type: string): void {
    switch (type) {
      case 'increment':
        this.page += 1;
        break;

      case 'decrement':
        this.page -= 1;
        break;
    }
  }

  private get searchCount(): number {
    return this.$store.state.requests.search.count;
  }

  private get profileCount(): number {
    return this.$store.state.requests.profile.count;
  }

  private decrementRequestCount(): void {
    this.$store.commit('decrementRequestCount', {
      type: 'search',
      quantity: 1,
    });
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
      order: this.order,
      sort: this.sortBy,
    };

    const data: APITypes.FindUserResponse = await API.findUser(params);

    return data;
  }

  private async searchRepository(): Promise<APITypes.FindRepositoryResponse> {
    const params: APITypes.FindRepositoryParams = {
      q: this.keyword,
      page: this.page,
      per_page: this.perPage,
      order: this.order,
      sort: this.sortBy,
    };

    return await API.findRepository(params);
  }

  private handleRequestFinish(): void {
    this.decrementRequestCount();
    this.hideLoader();
  }

  private async handleSearch(): Promise<void> {
    this.fetchingData = true;

    try {
      const data =
        this.mode === SearchMode.user
          ? await this.searchUser()
          : await this.searchRepository();

      this.resultsCount = Search.countResults(data.total_count, 1000);
      this.data = data.items;
      this.maxPage = Search.countPages(this.resultsCount, this.perPage);

      if (data.total_count === 0) this.showError('Sorry', 'No results found');
    } catch (error) {
      if (error?.status === 403) this.showError('Sorry', 'API limit exceeded');
      else this.showError('Sorry', 'API error ocurred. Please refresh page');
    } finally {
      this.handleRequestFinish();
    }
  }

  private recalculatePages(): void {
    this.maxPage = Search.countPages(this.resultsCount, this.perPage);
    if (this.page > this.maxPage) this.page = this.maxPage;
  }

  private changePage(): void {
    this.$router.push({
      params: { ...this.$route.params, page: `${this.page}` },
    });
    scrollTop(250);
  }

  private handleFiltersChange({ sort, order, perPage }: SearchFilters): void {
    this.sortBy = sort;
    this.order = order;
    this.perPage = perPage;
  }

  @Watch('page')
  private async handlPageChange(): Promise<void> {
    this.handleSearch();
    this.changePage();
  }

  @Watch('perPage')
  private async handlePerPageChange(): Promise<void> {
    this.recalculatePages();
    this.handleSearch();
  }

  @Watch('sortBy')
  @Watch('order')
  private async handleSortChange(): Promise<void> {
    this.handleSearch();
  }

  mounted(): void {
    this.handleSearch();
  }
}
</script>

<style lang="scss" scoped>
.searchResultsWrapper {
  display: flex;
  margin-top: 5vh;
  padding: 5vh 10vw;
  justify-content: center;

  @include sm() {
    margin-top: 7vh;
  }

  .list {
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 100%;
    flex-wrap: wrap;
    max-width: $xl-min;

    .paginator {
      display: flex;
      width: 100%;
      padding: 5vh 0 2vh;
      justify-content: center;

      button {
        margin: 0 2vh;
        cursor: pointer;
        background-color: transparent;
        outline: none;
        border: none;
        transition: 0.2s;

        &:disabled {
          opacity: 0.6;
        }

        &:disabled:hover {
          transform: scale(1);
          i {
            color: $green;
          }
        }

        &:hover {
          transform: scale(1.2);

          i {
            color: $hoverGreen;
          }
        }

        i {
          font-size: 1.8rem;
          color: $green;
        }
      }
    }
  }
}
</style>
