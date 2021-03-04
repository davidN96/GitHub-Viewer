<template>
  <div class="userPreviewWrapper">
    <!-- <ErrorModal
      v-if="error.isActive"
      :title="error.title"
      :message="error.message"
      :redirectTo="error.redirection"
    />
    <Loader :isActive="fetchingData" /> -->
    <!-- <div class="userPanelWrapper" v-if="!fetchingData">
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
              @pageChange="handlePageChange"
            />
          </PreviewSection>
          <PreviewSection :title="'Followers'">
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
              @pageChange="handlePageChange"
            />
          </PreviewSection>
          <PreviewSection :title="'Followed'">
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
              @pageChange="handlePageChange"
            />
          </PreviewSection>
        </main>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ItemTile from '@/components/ItemTile/index.vue';
import PreviewSection from '@/components/PreviewSection/index.vue';
import * as APITypes from '@/controllers/api/types';
import { AppError } from '@/global';

@Component({ components: { ItemTile, PreviewSection } })
export default class UserPreview extends Vue {
  private user: APITypes.ExtendedUser | null = null;
  private repositories: APITypes.Repository[] = [];
  private followers: APITypes.User[] = [];
  private followed: APITypes.User[] = [];
  private fetchingData: boolean = false;
  private isRepoActive: boolean = true;
  private isFollowersActive: boolean = true;
  private isFollowedActive: boolean = true;
  private requiredRequestCount: number = 2;

  private error: AppError = {
    isActive: false,
    title: 'Sorry',
    message: 'Error ocurred',
    redirection: '',
  };

  private get name(): string {
    return this.$route.params.name;
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
      quantity: 0,
    });
    this.hideLoader();
  }

  private checkRequestsCount(): void {
    if (this.$store.state.requests.profile.quantity < this.requiredRequestCount)
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

  @Watch('$route.fullPath')
  private handleRouteChange(): void {
    console.log('Change route event');
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
