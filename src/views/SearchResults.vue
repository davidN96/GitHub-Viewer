<template>
  <div class="searchResultsWrapper">
    <ErrorModal
      v-if="error.isActive"
      :title="error.title"
      :message="error.message"
      :redirectTo="error.redirection"
    />
    <Loader :isActive="data.isFetching" />
    <div
      class="list"
      :class="{ fadedIn: !data.isFetching, fadedOut: data.isFetching }"
    >
      <SearchFilters
        :perPageOptions="searchFilterControl.perPageOptions"
        :sortOptions="searchFilterControl.sortOptions"
        :orderOptions="searchFilterControl.orderOptions"
        :results="data.resultsCount"
        :sort="searchFilters.sort"
        :order="searchFilters.order"
        :perPage="searchFilters.perPage"
        @filtersChange="handleFiltersChange"
      />
      <ResultsCounter
        :results="data.resultsCount"
        :page="searchPageControl.page"
        :maxPage="searchPageControl.maxPage"
      />
      <ItemTile
        v-for="item of data.results"
        :item="item"
        :key="item.node_id"
        :type="mode"
      />
      <Paginator
        :page="searchPageControl.page"
        :maxPage="searchPageControl.maxPage"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { scrollTop } from '@/utils/view';
import * as SearchTypes from '@/global';
import * as APITypes from '@/controllers/api/types';
import * as Search from '@/utils/search';
import ItemTile from '@/components/ItemTile/index.vue';
import API from '@/controllers/api';

@Component({ components: { ItemTile } })
export default class SearchResult extends Vue {
  private mode: string = this.$route.params.mode;
  private keyword: string = this.$route.params.keyword;

  private error: SearchTypes.AppError = {
    isActive: false,
    title: 'Sorry',
    message: 'Error ocurred',
    redirection: '',
  };

  private data: SearchTypes.SearchResults = {
    results: [],
    resultsCount: 0,
    isFetching: true,
  };

  private searchPageControl: SearchTypes.SearchPageControl = {
    page: parseInt(this.$route.params.page),
    maxPage: 1,
  };

  private searchFilterControl: SearchTypes.ExtendedSearchFilterControl = {
    sortOptions:
      this.mode === SearchTypes.SearchMode.user
        ? SearchTypes.userSortOptions
        : SearchTypes.repoSortOptions,
    perPageOptions: SearchTypes.perPageOptions,
    orderOptions: SearchTypes.orderOptions,
  };

  private searchFilters: SearchTypes.ExtendedSearchFilters = {
    perPage: SearchTypes.perPageOptions[0],
    sort: this.searchFilterControl.sortOptions?.length
      ? this.searchFilterControl.sortOptions[0]
      : null,
    order: APITypes.Order.desc,
  };

  private handlePageChange(page: number): void {
    this.searchPageControl.page = page;
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
    this.data.isFetching = true;
  }

  private hideLoader(): void {
    setTimeout(() => (this.data.isFetching = false), 300);
  }

  private showError(title: string, message: string): void {
    this.error = {
      title,
      message,
      isActive: true,
      redirection: '/',
    };
  }

  private async searchUser(): Promise<APITypes.FindItemResponse> {
    const params: APITypes.FindItemFullParams = {
      q: this.keyword,
      page: this.searchPageControl.page,
      ...this.searchFilters,
    };

    const data: APITypes.FindItemResponse = await API.findUser(params);

    return data;
  }

  private async searchRepository(): Promise<APITypes.FindItemResponse> {
    const params: APITypes.FindItemFullParams = {
      q: this.keyword,
      page: this.searchPageControl.page,
      ...this.searchFilters,
    };

    return await API.findRepository(params);
  }

  private handleRequestFinish(): void {
    this.decrementRequestCount();
    this.hideLoader();
  }

  private async handleSearch(): Promise<void> {
    this.data.isFetching = true;

    try {
      const data =
        this.mode === SearchTypes.SearchMode.user
          ? await this.searchUser()
          : await this.searchRepository();

      this.data.resultsCount = Search.countResults(data.total_count, 1000);
      this.data.results = data.items;
      this.searchPageControl.maxPage = Search.countPages(
        this.data.resultsCount,
        this.searchFilters.perPage
      );

      if (data.total_count === 0) this.showError('Sorry', 'No results found');
    } catch (error) {
      if (error?.status === 403) this.showError('Sorry', 'API limit exceeded');
      else this.showError('Sorry', 'API error ocurred. Please refresh page');
    } finally {
      this.handleRequestFinish();
    }
  }

  private recalculatePages(): void {
    this.searchPageControl.maxPage = Search.countPages(
      this.data.resultsCount,
      this.searchFilters.perPage
    );
    if (this.searchPageControl.page > this.searchPageControl.maxPage)
      this.searchPageControl.page = this.searchPageControl.maxPage;
  }

  private changePage(): void {
    this.$router.push({
      params: { ...this.$route.params, page: `${this.searchPageControl.page}` },
    });
    scrollTop(250);
  }

  private handleFiltersChange(params: SearchTypes.ExtendedSearchFilters): void {
    this.searchFilters = params;
  }

  @Watch('searchPageControl.page')
  private async handlPageChange(): Promise<void> {
    this.handleSearch();
    this.changePage();
  }

  @Watch('searchFilters', { deep: true })
  private async handlePerPageChange(): Promise<void> {
    this.recalculatePages();
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
    align-items: flex-start;
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
