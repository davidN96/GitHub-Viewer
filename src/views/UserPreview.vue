<template>
  <div class="userPreviewWrapper">
    <ErrorModal
      v-if="isCrashed"
      :title="errorTitle"
      :message="errorMessage"
      :redirectTo="errorRedirection"
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
            <ItemTile
              v-for="repo of repositories"
              :key="repo.node_id"
              :type="'repository'"
              :item="repo"
            />
            <h4 v-if="repositories.length === 0">
              No repositories found
            </h4>
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
  private isCrashed: boolean = false;
  private errorTitle: string = 'Sorry';
  private errorMessage: string = 'Error ocurred';
  private errorRedirection = '';

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
    this.isCrashed = true;
    this.errorTitle = title;
    this.errorMessage = message;
    this.errorRedirection = redirection;
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

  private async loadData(): Promise<void> {
    this.checkRequestsCount();

    this.fetchingData = true;

    try {
      this.user = await API.getUser(this.name);
      this.repositories = await API.getUserRepositories(this.name);
      this.followers = await API.getUserFollowers(this.name);
      this.followed = await API.getFollowedByUser(this.name);
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

  mounted(): void {
    this.loadData();
  }

  @Watch('$route.fullPath')
  private handleRouteChange(): void {
    this.loadData();
    this.activateViews();
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
    justify-content: start;
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
