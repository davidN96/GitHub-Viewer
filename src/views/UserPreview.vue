<template>
  <div class="userPreviewWrapper">
    <ErrorModal
      v-if="error && error.isActive"
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
          <PreviewList
            :title="'Repositories'"
            :sortOptions="repoSortOptions"
            :resultsCount="user.public_repos"
            @changeData="loadRepos"
          >
            <ItemTile
              v-for="repo of repositories"
              :key="repo.node_id"
              :type="'repository'"
              :item="repo"
            />
          </PreviewList>
          <PreviewList
            :title="'Followers'"
            :resultsCount="user.followers"
            @changeData="loadFollowers"
          >
            <ItemTile
              v-for="follower of followers"
              :key="follower.node_id"
              :type="'user'"
              :item="follower"
            />
          </PreviewList>
          <PreviewList
            :title="'Followed'"
            :resultsCount="user.following"
            @changeData="loadFollowed"
          >
            <ItemTile
              v-for="followedUser of followed"
              :key="followedUser.node_id"
              :type="'user'"
              :item="followedUser"
            />
          </PreviewList>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import PreviewSection from '@/components/PreviewSection/index.vue';
import API from '@/controllers/api';
import * as APITypes from '@/controllers/api/types';
import * as Global from '@/global';
import * as Error from '@/utils/errors';

@Component({ components: { PreviewSection } })
export default class UserPreview extends Vue {
  private isFetching: boolean = true;
  private user: APITypes.ExtendedUser | null = null;
  private error: Global.AppError | null = null;
  private repositories: APITypes.Repository[] = [];
  private followers: APITypes.User[] = [];
  private followed: APITypes.User[] = [];
  private repoSortOptions: string[] = Global.userRepoSortOptions;

  private get username(): string {
    return this.$route.params.name;
  }

  private async loadUser(): Promise<void> {
    try {
      this.user = await API.getUser(this.username);
    } catch (error) {
      if (error?.status === 404) this.error = Error.NotFound('User');
      else if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadRepos(params: APITypes.FindItemParams): Promise<void> {
    try {
      this.repositories = await API.getUserRepositories(this.username, params);
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadFollowers(params: APITypes.FindItemParams): Promise<void> {
    try {
      this.followers = await API.getUserFollowers(this.username, params);
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadFollowed(params: APITypes.FindItemParams): Promise<void> {
    try {
      this.followed = await API.getFollowedByUser(this.username, params);
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadData(): Promise<void> {
    this.isFetching = true;
    await this.loadUser();
    await this.loadRepos(Global.defaultRepoRequestParams);
    await this.loadFollowers(Global.defaultUserRequestParams);
    await this.loadFollowed(Global.defaultUserRequestParams);
    this.isFetching = false;
  }

  @Watch('$route.fullPath')
  private async handleUserChange(): Promise<void> {
    await this.loadData();
  }

  async mounted(): Promise<void> {
    await this.loadData();
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
      padding: 2vh 2.5vw;

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
            transform: scale(1.2);
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
