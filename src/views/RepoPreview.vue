<template>
  <div class="repoPreviewWrapper">
    <ErrorModal
      v-if="error && error.isActive"
      :title="error.title"
      :message="error.message"
      :redirectTo="error.redirection"
    />
    <Loader :isActive="isFetching" />
    <div class="repoPanelWrapper" v-if="repository">
      <header>
        <div class="mainInfo">
          <div class="title">
            <h3 class="name">{{ repository.name }}</h3>
            <h4 class="owner">{{ repository.owner.login }}</h4>
          </div>

          <a class="github" :href="repository.html_url">
            <i class="fab fa-github-alt"></i>
          </a>
        </div>
        <div class="description">
          <p>{{ repository.description }}</p>
          <p>{{ repository.language }}</p>
        </div>
        <Ratings
          :stargazers="repository.stargazers_count"
          :watchers="repository.watchers"
          :forks="repository.forks"
          :issues="repository.open_issues"
        />
      </header>
      <main>
        <PreviewList
          :title="'Contributors'"
          :resultsCount="contributors.length"
          :disable-filters="true"
        >
          <ItemTile
            v-for="contributor of contributors"
            :key="contributor.node_id"
            :type="'user'"
            :item="contributor"
          />
        </PreviewList>
        <PreviewSection :title="'Commits'">
          <Commit v-for="commit of commits" :data="commit" :key="commit.sha" />
        </PreviewSection>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as APITypes from '@/controllers/api/types';
import * as Global from '@/global';
import * as Error from '@/utils/errors';
import API from '@/controllers/api';
import Ratings from '@/components/RatingsPanel/index.vue';
import Commit from '@/components/Commit/index.vue';

@Component({ components: { Ratings, Commit } })
export default class RepoPreview extends Vue {
  private isFetching: boolean = false;
  private repository: APITypes.ExtendedRepository | null = null;
  private contributors: APITypes.User[] = [];
  private commits: APITypes.Commit[] = [];
  private error: Global.AppError | null = null;

  private get owner(): string {
    return this.$route.params.owner;
  }

  private get name(): string {
    return this.$route.params.name;
  }

  private async loadRepository(): Promise<void> {
    try {
      this.repository = await API.getRepository(this.owner, this.name);
    } catch (error) {
      if (error?.status === 404) this.error = Error.NotFound('User');
      else if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadContributors(): Promise<void> {
    try {
      this.contributors = await API.getRepositoryContributors(
        this.owner,
        this.name
      );
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  private async loadCommits(): Promise<void> {
    try {
      this.commits = await API.getRepositoryCommits(this.owner, this.name);
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    }
  }

  async mounted(): Promise<void> {
    this.isFetching = true;
    await this.loadRepository();
    await this.loadContributors();
    await this.loadCommits();
    this.isFetching = false;
  }
}
</script>

<style lang="scss" scoped>
.repoPreviewWrapper {
  padding: 2vh 0;
  width: 100%;
  max-width: $xl-min;
  margin: 5vh auto 2vh;
  padding: 10vh 3vw;

  header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1vh 3vw;

    .mainInfo {
      display: flex;
      flex-grow: 1;
      align-items: center;
      margin-bottom: 3vh;

      .title {
        h3 {
          margin: 1vh 0;
        }

        h4 {
          color: $hoverGray;
        }
      }

      .github {
        margin-left: auto;

        i {
          font-size: 1.5rem;
          transition: 0.2s;
        }

        &:hover {
          i {
            color: $green;
            transform: scale(1.2);
          }
        }
      }
    }
    .description {
      color: $hoverGray;
      margin-bottom: 3vh;
    }
  }
}
</style>
