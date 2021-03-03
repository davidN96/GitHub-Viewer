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
      <div class="filters">
        <form>
          <div>
            <label for="perPage">Per page:</label>
            <select id="perPage" v-model="perPage">
              <option
                v-for="number in perPageOptions"
                :key="number"
                :valie="number"
                >{{ number }}</option
              >
            </select>
          </div>
          <div>
            <label for="sort">Sort by:</label>
            <select id="sort" v-model="sortBy">
              <option
                v-for="sortOption in sortOptions"
                :value="sortOption"
                :key="sortOption"
                >{{ sortOption | capitalize }}</option
              >
            </select>
          </div>
          <div>
            <label for="order">Order:</label>
            <select id="order" v-model="order">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </form>
        <div class="results">
          <h5>Current page: {{ page }}</h5>
          <h5>Pages: {{ maxPage }}</h5>
          <h5>Results: {{ resultsCount }}</h5>
        </div>
      </div>
      <ItemTile
        v-for="item of data"
        :item="item"
        :key="item.node_id"
        :type="mode"
      />
      <Paginator
        :page="page"
        :eventName="'pageChange'"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { SearchMode } from '@/global';
import ItemTile from '@/components/ItemTile/index.vue';
import * as APITypes from '@/controllers/api/types';
import * as Search from '@/utils/search';
import API from '@/controllers/api';

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
    this.page = Search.countPages(this.resultsCount, this.perPage);
    if (this.page > this.maxPage) this.page = this.maxPage;
  }

  private changePage(): void {
    this.$router.push({
      params: { ...this.$route.params, page: `${this.page}` },
    });
    setTimeout(() => window.scrollTo(0, 0), 250);
  }

  @Watch('page')
  private async handleFiltersChange(): Promise<void> {
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

    .filters {
      display: flex;
      width: 100%;
      padding: 2vh 1.5vw;
      margin: 2vh 0 3vh;
      flex-wrap: wrap;

      form {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
          display: flex;
          align-items: center;
          flex-direction: column;

          @include md() {
            flex-direction: row;
          }
        }

        label {
          font-size: 0.8rem;

          @include md() {
            font-size: 0.9rem;
          }
        }

        #perPage,
        #sort,
        #order {
          padding: 5px;
          margin: 1vh 1vw;
          font-size: 0.75rem;
          background-color: transparent;
          border: 2px solid $white;
          border-radius: $min-radius;
          color: $white;
          cursor: pointer;
          transition: 0.2s;

          @include md() {
            font-size: 0.9rem;
          }

          &:hover {
            color: $green;
            border-color: $green;
          }

          option {
            color: black;
          }
        }
      }

      .results {
        display: flex;
        width: 100%;

        h5 {
          margin: 5px 2vw 0 0;
          font-size: 0.8rem;
        }
      }
    }

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
