<template>
  <div class="userPreviewWrapper">
    <!-- <ErrorModal
      v-if="error.isActive"
      :title="error.title"
      :message="error.message"
      :redirectTo="error.redirection"
    />
    <Loader :isActive="isFetching" />
    <div class="userPanelWrapper" v-if="!isFetching">
      <div
        class="userPanel"
        v-if="user"
        :class="{ fadeIn: !isFetching, fadedOut: isFetching }"
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
              :perPage="repoSearchFilters.perPage"
              :perPageOptions="repoSearchControl.perPageOptions"
              :order="repoSearchFilters.order"
              :orderOptions="repoSearchControl.orderOptions"
              :sort="repoSearchFilters.sort"
              :sortOptions="repoSearchControl.sortOptions"
              :type="'repo'"
              @filtersChange="handleFiltersChange"
            />
            <ResultsCounter
              :results="repositories.resultsCount"
              :page="repoPageControl.page"
              :maxPage="repoPageControl.maxPage"
            />
            <ItemTile
              v-for="repo of repositories.results"
              :key="repo.node_id"
              :type="'repository'"
              :item="repo"
            />
            <h4 v-if="!repositories.resultsCount">
              No repositories found
            </h4>
            <Paginator
              v-if="repoPageControl.maxPage > 1"
              :page="repoPageControl.page"
              :maxPage="repoPageControl.maxPage"
              :type="'repo'"
              @pageChange="handlePageChange"
            />
          </PreviewSection>
          <PreviewSection :title="'Followers'">
            <SearchFilters
              :perPage="followersSearchFilters.perPage"
              :perPageOptions="followersSearchControl.perPageOptions"
              :orderOptions="[]"
              :sortOptions="[]"
              :type="'repo'"
              @filtersChange="handleFiltersChange"
            />
            <ResultsCounter
              :results="followers.resultsCount"
              :page="followersPageControl.page"
              :maxPage="followersPageControl.maxPage"
            />
            <ItemTile
              v-for="follower of followers.results"
              :key="follower.node_id"
              :type="'user'"
              :item="follower"
            />
            <h4 v-if="!followers.resultsCount">
              No repositories found
            </h4>
            <Paginator
              v-if="followersPageControl.maxPage > 1"
              :page="followersPageControl.page"
              :maxPage="followersPageControl.maxPage"
              :type="'followers'"
              @pageChange="handlePageChange"
            />
          </PreviewSection>
          <PreviewSection :title="'Followed'">
            <SearchFilters
              :perPage="followedSearchFilters.perPage"
              :perPageOptions="followedSearchControl.perPageOptions"
              :orderOptions="[]"
              :sortOptions="[]"
              :type="'repo'"
              @filtersChange="handleFiltersChange"
            />
            <ResultsCounter
              :results="followed.resultsCount"
              :page="followedPageControl.page"
              :maxPage="followedPageControl.maxPage"
            />
            <ItemTile
              v-for="followed of followed.results"
              :key="followed.node_id"
              :type="'user'"
              :item="followed"
            />
            <h4 v-if="!followed.resultsCount">
              No repositories found
            </h4>
            <Paginator
              v-if="followedPageControl.maxPage > 1"
              :page="followedPageControl.page"
              :maxPage="followedPageControl.maxPage"
              :type="'followed'"
              @pageChange="handlePageChange"
            />
          </PreviewSection>
        </main>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
// import { Vue, Component, Watch } from 'vue-property-decorator';
// import PreviewSection from '@/components/PreviewSection/index.vue';
// import ItemTile from '@/components/ItemTile/index.vue';
// import API from '@/controllers/api';
// import * as APITypes from '@/controllers/api/types';
// import * as Utils from '@/utils/search';
// import * as Custom from '@/global';

// @Component({ components: { ItemTile, PreviewSection } })
// export default class UserPreview extends Vue {
//   private requiredRequestCount: number = 4;
//   private user: APITypes.ExtendedUser | null = null;
//   private isFetching: boolean = true;

//   private get name(): string {
//     return this.$route.params.name;
//   }

//   private repositories: Custom.SearchResults = {
//     results: [],
//     resultsCount: 0,
//     isFetching: true,
//   };

//   private repoPageControl: Custom.SearchResultControl = {
//     page: 1,
//     maxPage: 1,
//   };

//   private repoSearchControl: Custom.ExtendedSearchFilterControl = {
//     perPageOptions: Custom.perPageOptions,
//     sortOptions: Custom.userRepoSortOptions,
//     orderOptions: Custom.orderOptions,
//   };

//   private repoSearchFilters: Custom.ExtendedSearchFilters = {
//     perPage: this.repoSearchControl.perPageOptions[0],
//     sort: this.repoSearchControl.sortOptions[0],
//     order: this.repoSearchControl.orderOptions[0],
//   };

//   private followers: Custom.SearchResults = {
//     results: [],
//     resultsCount: 0,
//     isFetching: true,
//   };

//   private followersPageControl: Custom.SearchResultControl = {
//     page: 1,
//     maxPage: 1,
//   };

//   private followersSearchControl: Custom.SearchFilterControl = {
//     perPageOptions: Custom.perPageOptions,
//   };

//   private followersSearchFilters: Custom.SearchFilters = {
//     perPage: this.followersSearchControl.perPageOptions[0],
//   };

//   private followed: Custom.SearchResults = {
//     results: [],
//     resultsCount: 0,
//     isFetching: true,
//   };

//   private followedPageControl: Custom.SearchResultControl = {
//     page: 1,
//     maxPage: 1,
//   };

//   private followedSearchControl: Custom.SearchFilterControl = {
//     perPageOptions: Custom.perPageOptions,
//   };

//   private followedSearchFilters: Custom.SearchFilters = {
//     perPage: this.followedSearchControl.perPageOptions[0],
//   };

//   private error: Custom.AppError = {
//     isActive: false,
//     title: 'Sorry',
//     message: 'Error ocurred',
//     redirection: '',
//   };

//   private limitError: Custom.AppError = {
//     isActive: true,
//     title: 'Sorry',
//     message: 'API request limit exceeded',
//     redirection: '/',
//   };

//   private notFoundError: Custom.AppError = {
//     isActive: true,
//     title: 'Sorry',
//     message: 'User not found',
//     redirection: '/',
//   };

//   private otherError: Custom.AppError = {
//     isActive: true,
//     title: 'Sorry',
//     message: 'An error ocurred',
//     redirection: '/',
//   };

//   private async handlePageChange(type: string, mode: string): Promise<void> {
//     switch (mode) {
//       case 'increment':
//         switch (type) {
//           case 'repo':
//             this.repoPageControl.page += 1;
//             await this.loadRepositories();
//             break;

//           case 'followers':
//             this.followersPageControl.page += 1;
//             await this.loadFollowers();
//             break;

//           case 'followed':
//             this.followersPageControl.page += 1;
//             await this.loadFollowed();
//             break;
//         }
//         break;

//       case 'decrement':
//         switch (type) {
//           case 'repo':
//             this.repoPageControl.page -= 1;
//             await this.loadRepositories();
//             break;

//           case 'followers':
//             this.followersPageControl.page -= 1;
//             await this.loadFollowed();
//             break;

//           case 'followed':
//             this.followersPageControl.page -= 1;
//             await this.loadFollowers();
//             break;
//         }
//         break;
//     }
//   }

//   private checkRequestsCount(): boolean {
//     const limit: number = this.$store.state.requests.profile.quantity;

//     if (limit === 0 || limit - this.requiredRequestCount <= 0) {
//       this.error = this.limitError;
//       return false;
//     }

//     return true;
//   }

//   private handleRequestFinish(): void {
//     this.$store.commit('decrementRequestCount', {
//       type: 'profile',
//       quantity: this.requiredRequestCount,
//     });
//   }

//   private countElements(
//     repositories: number,
//     followers: number,
//     followed: number
//   ): void {
//     this.repositories.resultsCount = Utils.countResults(repositories, 1000);
//     this.repoPageControl.maxPage = Utils.countPages(
//       this.repositories.resultsCount,
//       this.repoSearchFilters.perPage
//     );

//     this.followers.resultsCount = Utils.countResults(followers, 1000);
//     this.followersPageControl.maxPage = Utils.countPages(
//       this.followers.resultsCount,
//       this.followersSearchFilters.perPage
//     );

//     this.followed.resultsCount = Utils.countResults(followed, 1000);
//     this.followedPageControl.maxPage = Utils.countPages(
//       this.followed.resultsCount,
//       this.followedSearchFilters.perPage
//     );
//   }

//   private async loadUser(): Promise<void> {
//     const requestAvailable: boolean = this.checkRequestsCount();
//     if (!requestAvailable) return;

//     try {
//       this.user = await API.getUser(this.name);
//       this.countElements(
//         this.user.public_repos,
//         this.user.followers,
//         this.user.following
//       );
//     } catch (error) {
//       if (error.name === 'limit') this.error = this.limitError;
//       if (error?.status === 404) this.error = this.notFoundError;
//       else this.error = this.otherError;
//     }
//   }

//   private async loadRepositories(): Promise<void> {
//     const requestAvailable: boolean = this.checkRequestsCount();
//     if (!requestAvailable) return;

//     try {
//       this.repositories.results = await API.getUserRepositories(this.name, {
//         page: this.repoPageControl.page,
//         per_page: this.repoSearchFilters.perPage,
//         sort: this.repoSearchFilters.sort,
//         direction: this.repoSearchFilters.order,
//       });
//     } catch (e) {
//       this.error = this.otherError;
//     }
//   }

//   private async loadFollowers(): Promise<void> {
//     const requestAvailable: boolean = this.checkRequestsCount();
//     if (!requestAvailable) return;

//     try {
//       this.followers.results = await API.getUserFollowers(this.name, {
//         page: this.followersPageControl.page,
//         per_page: this.followedSearchFilters.perPage,
//       });
//     } catch (e) {
//       this.error = this.otherError;
//     }
//   }

//   private async loadFollowed(): Promise<void> {
//     const requestAvailable: boolean = this.checkRequestsCount();
//     if (!requestAvailable) return;

//     try {
//       this.followed.results = await API.getFollowedByUser(this.name, {
//         page: this.followersPageControl.page,
//         per_page: this.followersSearchFilters.perPage,
//       });
//     } catch (e) {
//       this.error = this.otherError;
//     }
//   }

//   private async handleFiltersChange(
//     type: string,
//     values: Custom.ExtendedSearchFilters
//   ): Promise<void> {
//     switch (type) {
//       case 'repo':
//         this.repoSearchFilters = values;

//         this.repoPageControl.maxPage = Utils.countPages(
//           this.repositories.resultsCount,
//           values.perPage
//         );
//         if (this.repoPageControl.page > this.repoPageControl.maxPage)
//           this.repoPageControl.page = this.repoPageControl.maxPage;
//         this.loadRepositories();
//         break;
//       case 'followers':
//         this.followersSearchFilters.perPage = values.perPage;
//         this.followersPageControl.maxPage = Utils.countPages(
//           this.followers.resultsCount,
//           values.perPage
//         );
//         if (this.followersPageControl.page > this.followersPageControl.maxPage)
//           this.followersPageControl.page = this.followersPageControl.maxPage;
//         this.loadFollowers();
//         break;

//       case 'followed':
//         this.followedSearchFilters.perPage = values.perPage;
//         this.followedPageControl.maxPage = Utils.countPages(
//           this.followed.resultsCount,
//           values.perPage
//         );
//         if (this.followedPageControl.page > this.followedPageControl.maxPage)
//           this.followedPageControl.page = this.followedPageControl.maxPage;
//         this.loadFollowed();
//         break;
//     }
//   }

//   private async loadFullData(): Promise<void> {
//     this.isFetching = true;
//     await this.loadUser();
//     await this.loadRepositories();
//     await this.loadFollowers();
//     await this.loadFollowed();
//     this.isFetching = false;
//   }

//   @Watch('$route.fullPath')
//   private handleRouteChange(): void {
//     console.log('Change route event');
//   }

//   async mounted(): Promise<void> {
//     await this.loadFullData();
//   }
// }
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
