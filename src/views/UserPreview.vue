<template>
  <div class="userPreviewWrapper">
    <ErrorModal
      v-if="error.isActive"
      :title="error.title"
      :message="error.message"
      :redirectTo="error.redirection"
    />
    <Loader :isActive="fetchingData" />
    <div class="userPanelWrapper" v-if="!fetchingData">
      <div
        class="userPanel"
        :class="{ fadeIn: !fetchingData, fadedOut: fetchingData }"
      >
        <header class="userInfo">
          <div class="thumbnail">
            <img :src="user.avatar_url" alt="Avatar" />
          </div>
          <div class="name">
            <h4>{{ user.login }}</h4>
          </div>
          <a class="github" :href="user.html_url">
            <i class="fab fa-github-alt"></i>
          </a>
        </header>
        <main>
          <PreviewSection :title="'Repositories'">
            <SearchFilters
              v-if="repoFilters.results"
              :perPageOptions="repoFilters.perPageOptions"
              :sortOptions="repoFilters.sortOptions"
              :results="repoFilters.results"
              :currentPage="repoFilters.page"
              :sort="repoFilters.sort"
              :order="repoFilters.order"
              :perPage="repoFilters.perPage"
              :type="'repo'"
              @filtersChange="handleFiltersChange"
            />
            <ItemTile
              v-for="repo of repositories"
              :key="repo.node_id"
              :type="'repository'"
              :item="repo"
            />
            <h4 v-if="repositories.length === 0">
              No repositories found
            </h4>
            <Paginator
              v-if="repoFilters.results"
              :page="repoFilters.page"
              :maxPage="repoFilters.maxPage"
              :type="'repo'"
            />
          </PreviewSection>
          <PreviewSection :title="'Followers'">
            <SearchFilters
              v-if="followersFilters.results"
              :perPageOptions="followersFilters.perPageOptions"
              :sortOptions="followersFilters.sortOptions"
              :results="followersFilters.results"
              :currentPage="followersFilters.page"
              :sort="followersFilters.sort"
              :order="followersFilters.order"
              :perPage="followersFilters.perPage"
              :type="'followers'"
              @filtersChange="handleFiltersChange"
            />
            <ItemTile
              v-for="follower of followers"
              :key="follower.node_id"
              :type="'user'"
              :item="follower"
            />
            <h4 v-if="followers.length === 0">
              No followers found
            </h4>
            <Paginator
              v-if="followersFilters.results"
              :page="followersFilters.page"
              :maxPage="followersFilters.maxPage"
              :type="'followers'"
            />
          </PreviewSection>
          <PreviewSection :title="'Followed'">
            <SearchFilters
              v-if="followedFilters.results"
              :perPageOptions="followedFilters.perPageOptions"
              :sortOptions="followedFilters.sortOptions"
              :results="followedFilters.results"
              :currentPage="followedFilters.page"
              :sort="followedFilters.sort"
              :order="followedFilters.order"
              :perPage="followedFilters.perPage"
              :type="'followed'"
              @filtersChange="handleFiltersChange"
            />
            <ItemTile
              v-for="followedUser of followed"
              :key="followedUser.node_id"
              :type="'user'"
              :item="followedUser"
            />
            <h4 v-if="followed.length === 0">
              No followed users found
            </h4>
            <Paginator
              v-if="followedFilters.results"
              :page="followedFilters.page"
              :maxPage="followedFilters.maxPage"
              :type="'followed'"
            />
          </PreviewSection>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ItemTile from '@/components/ItemTile/index.vue';
import PreviewSection from '@/components/PreviewSection/index.vue';
import * as APITypes from '@/controllers/api/types';
import API from '@/controllers/api';
import { SearchFiltersWithOptions, AppError } from '@/global';
import { SearchFilters } from '@/global';
import * as Search from '@/utils/search';

@Component({ components: { ItemTile, PreviewSection } })
export default class UserPreview extends Vue {
  private user: APITypes.ExtendedUser | null = null;
  private repositories: APITypes.Repository[] = [];
  private followers: APITypes.User[] = [];
  private followed: APITypes.User[] = [];
  private fetchingData: boolean = true;
  private isRepoActive: boolean = true;
  private isFollowersActive: boolean = true;
  private isFollowedActive: boolean = true;

  private error: AppError = {
    isActive: false,
    title: 'Sorry',
    message: 'Error ocurred',
    redirection: 'null',
  };

  private repoFilters: SearchFiltersWithOptions = {
    perPageOptions: [10, 20, 30, 40, 50],
    sortOptions: [
      APITypes.RepositorySortQuery.stars,
      APITypes.RepositorySortQuery.forks,
      APITypes.RepositorySortQuery.updated,
    ],
    page: 1,
    perPage: 10,
    maxPage: 1,
    results: 0,
    sort: APITypes.RepositorySortQuery.stars,
    order: APITypes.Order.desc,
  };

  private followersFilters: SearchFiltersWithOptions = {
    perPageOptions: [10, 20, 30, 40, 50],
    sortOptions: [
      APITypes.UserSortQuery.followers,
      APITypes.UserSortQuery.repositories,
      APITypes.UserSortQuery.joined,
    ],
    page: 1,
    perPage: 10,
    maxPage: 1,
    results: 0,
    sort: APITypes.UserSortQuery.repositories,
    order: APITypes.Order.desc,
  };

  private followedFilters: SearchFiltersWithOptions = {
    perPageOptions: [10, 20, 30, 40, 50],
    sortOptions: [
      APITypes.UserSortQuery.followers,
      APITypes.UserSortQuery.repositories,
      APITypes.UserSortQuery.joined,
    ],
    page: 1,
    perPage: 10,
    maxPage: 1,
    results: 0,
    sort: APITypes.UserSortQuery.repositories,
    order: APITypes.Order.desc,
  };

  private get name(): string {
    return this.$route.params.name;
  }

  private activateViews(): void {
    this.isRepoActive = true;
    this.isFollowersActive = true;
    this.isFollowedActive = true;
  }

  private deactivateViews(): void {
    this.isRepoActive = false;
    this.isFollowersActive = false;
    this.isFollowedActive = false;
  }

  private showError(title: string, message: string, redirection: string): void {
    this.error.isActive = true;
    this.error.title = title;
    this.error.message = message;
    this.error.redirection = redirection;
  }

  private hideLoader(): void {
    setTimeout(() => (this.fetchingData = false), 200);
  }

  private handleRequestFinish(): void {
    this.$store.commit('decrementRequestCount', {
      type: 'profile',
      quantity: 4,
    });
    this.hideLoader();
  }

  private checkRequestsCount(): void {
    if (this.$store.state.requests.profile.quantity < 4)
      this.showError(
        'Sorry',
        'API requests limit exceeded. Try again later',
        '/'
      );
  }

  private prepareRequest(): void {
    this.checkRequestsCount();
    this.fetchingData = true;
  }

  private loadFilter(type: string, results: number) {
    const resultsCount: number = Search.countResults(results, 1000);

    switch (type) {
      case 'repo':
        this.repoFilters.results = resultsCount;
        this.repoFilters.maxPage = Search.countPages(
          results,
          this.repoFilters.perPage
        );
        break;

      case 'followers':
        this.followersFilters.results = resultsCount;
        this.followersFilters.maxPage = Search.countPages(
          results,
          this.followersFilters.perPage
        );
        break;

      case 'followed':
        this.followedFilters.results = resultsCount;
        this.followedFilters.maxPage = Search.countPages(
          results,
          this.followedFilters.perPage
        );
        break;
    }
  }

  private async loadData(type: string): Promise<void> {
    this.prepareRequest();

    try {
      switch (type) {
        case 'user':
          this.user = await API.getUser(this.name);
          this.loadFilter('repo', this.user.public_repos);
          this.loadFilter('followers', this.user.followers);
          this.loadFilter('followed', this.user.following);

          break;

        case 'repo':
          this.repositories = await API.getUserRepositories(this.name, {
            per_page: this.repoFilters.perPage,
            page: this.repoFilters.page,
            sort: this.repoFilters.sort,
            order: this.repoFilters.order,
          });

          break;

        case 'followers':
          this.followers = await API.getUserFollowers(this.name, {
            per_page: this.followersFilters.perPage,
            page: this.followersFilters.page,
            sort: this.followersFilters.sort,
            order: this.followersFilters.order,
          });
          break;

        case 'followed':
          this.followed = await API.getFollowedByUser(this.name, {
            per_page: this.followedFilters.perPage,
            page: this.followedFilters.page,
            sort: this.followedFilters.sort,
            order: this.followedFilters.order,
          });
          break;
      }
    } catch (error) {
      switch (error?.status) {
        case 404:
          this.showError('Sorry', 'User not found', '/');
          break;

        case 403:
          this.showError(
            'Sorry',
            'API requests limit exceeded. Try again later',
            '/'
          );
          break;

        default:
          this.showError('Sorry', 'Unexpected error ocurred. Try again', '/');
          break;
      }
    } finally {
      this.handleRequestFinish();
    }
  }

  private async loadAllData(): Promise<void> {
    await this.loadData('user');
    await this.loadData('repo');
    await this.loadData('followed');
    await this.loadData('followers');
  }

  private async handleRepoFiltersChange(filters: SearchFilters): Promise<void> {
    const { sort, order, perPage }: SearchFilters = filters;

    await this.loadData('repo');
  }

  private async handlePageChange(mode: string, type: string) {
    switch (type) {
      case 'increment':
        switch (mode) {
          case 'repo':
            this.repoFilters.page++;
            break;

          case 'followers':
            this.repoFilters.page++;
            break;

          case 'followed':
            this.repoFilters.page++;
            break;
        }
        break;

      case 'decrement':
        switch (mode) {
          case 'repo':
            this.repoFilters.page--;
            break;

          case 'followers':
            this.repoFilters.page--;
            break;

          case 'followed':
            this.repoFilters.page--;
            break;
        }
        break;
    }
  }

  mounted(): void {
    this.loadAllData();
  }

  @Watch('$route.fullPath')
  private handleRouteChange(): void {
    this.loadAllData();
    this.activateViews();
  }

  @Watch('followersFilters.perPage')
  private handleChanges() {
    console.log('ASD');
  }
}
</script>

<style lang="scss" scoped>
.userPreviewWrapper {
  padding: 2vh 0;
  width: 100%;
  max-width: $xl-min;
  margin: 5vh auto 2vh;
  padding: 10vh 3vw;

  .userPanel {
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    justify-content: flex-start;
    flex-direction: column;

    .userInfo {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 2vh 3vw;

      .thumbnail {
        margin-right: 15px;

        img {
          width: 8vh;
          height: 8vh;
          max-width: 90px;
          max-height: 90px;
          z-index: 110;
          border-radius: $min-radius;
        }
      }

      .name {
        h4 {
          font-size: 1.3rem;
        }
      }

      .github {
        display: flex;
        padding: 2vh;
        margin-left: auto;
        align-items: center;

        i {
          transition: 0.2s;
          font-size: 1.5rem;
          margin-left: 10px;
        }

        &:hover {
          i {
            color: $green;
          }
        }
      }
    }

    main {
      padding: 0 0 10vh;
    }
  }
}
</style>
