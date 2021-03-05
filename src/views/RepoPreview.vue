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
          <div class="pagination">
            <button
              :disabled="contributorsPage === 1 || contributorsFetching"
              @click="contributorsPage--"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              :disabled="contributorsEnd || contributorsFetching"
              @click="contributorsPage++"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </PreviewList>
        <PreviewSection :title="'Commits'">
          <Commit v-for="commit of commits" :data="commit" :key="commit.sha" />
          <div class="pagination">
            <button
              :disabled="commitsPage === 1 || commitsFetching"
              @click="commitsPage--"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              :disabled="commitsEnd || commitsFetching"
              @click="commitsPage++"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </PreviewSection>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
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
  private commitsPage: number = 1;
  private commitsPerPage: number = 10;
  private commitsFetching: boolean = false;
  private contributorsPage: number = 1;
  private contributorsPerPage: number = 10;
  private contributorsFetching: boolean = false;
  private error: Global.AppError | null = null;

  private get owner(): string {
    return this.$route.params.owner;
  }

  private get name(): string {
    return this.$route.params.name;
  }

  private get commitsEnd(): boolean {
    return this.commits.length < this.commitsPerPage;
  }

  private get contributorsEnd(): boolean {
    return this.contributors.length < this.contributorsPerPage;
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
      this.contributorsFetching = true;
      this.contributors = await API.getRepositoryContributors(
        this.owner,
        this.name,
        { page: this.contributorsPage, perPage: this.contributorsPerPage }
      );
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    } finally {
      this.contributorsFetching = false;
    }
  }

  private async loadCommits(): Promise<void> {
    try {
      this.commitsFetching = true;
      this.commits = await API.getRepositoryCommits(this.owner, this.name, {
        perPage: this.commitsPerPage,
        page: this.commitsPage,
      });
    } catch (error) {
      if (error?.status === 403) this.error = Error.LimitExceeded();
      else this.error = Error.UnexpectedError();
    } finally {
      this.commitsFetching = false;
    }
  }

  @Watch('commitsPage')
  private async handleCommitsPageChange(): Promise<void> {
    await this.loadCommits();
  }

  @Watch('contributorsPage')
  private async handleContributorsPageChange(): Promise<void> {
    await this.loadContributors();
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

.pagination {
  display: flex;
  width: 100%;
  padding: 2vh 2vh;
  justify-content: center;

  button {
    background-color: $cardBackground;
    outline: none;
    border: none;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    margin: 0 2vw;
    transition: 0.2s;
    cursor: pointer;

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
      font-size: 1.2rem;
      color: $green;
    }
  }
}
</style>
