<template>
  <router-link
    class="itemTileWrapper"
    :to="{
      name: isRepo ? 'Repository' : 'User',
      params: isRepo
        ? { owner: item.owner.login, name: item.name }
        : { name: item.login },
    }"
  >
    <div class="thumbnail">
      <img :src="item.avatar_url" alt="avatar" v-if="type === 'user'" />
      <div class="repoIcon" v-if="isRepo">
        <i class="far fa-folder"></i>
      </div>
    </div>
    <div class="informations">
      <div class="userInfo" v-if="isUser">
        <p>{{ item.login }}</p>
      </div>
      <div class="repoInfo" v-if="isRepo">
        <header>
          <h5>{{ item.name }}</h5>
        </header>
        <main>
          <div class="details">
            <div class="forks">
              <i class="fas fa-code-branch"></i>
              <h5>{{ item.forks }}</h5>
            </div>

            <div class="stars">
              <i class="far fa-star"></i>
              <h5>{{ item.stargazers_count }}</h5>
            </div>

            <div class="lang">
              <i class="fas fa-code"></i>
              <h5>
                {{ item.language || 'Not specified' }}
              </h5>
            </div>
          </div>
        </main>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User, Repository } from '@/controllers/api/types';
import { SearchMode } from '@/global';

@Component
export default class ItemTile extends Vue {
  @Prop() readonly item!: User | Repository;
  @Prop() readonly type!: SearchMode.user | SearchMode.repo;

  private readonly isRepo: boolean = this.type === SearchMode.repo;
  private readonly isUser: boolean = this.type === SearchMode.user;
}
</script>

<style lang="scss" scoped>
.itemTileWrapper {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 1vh 0;
  padding: 2vh 3vw;
  border: 1px solid $darkGray;
  border-radius: $min-radius;
  background-color: $cardBackground;
  cursor: pointer;
  transition: 0.2s;
  flex-shrink: 1;
  flex-basis: 100%;
  margin: 1vh 1.5%;
  min-width: 200px;
  height: 110px;

  @include sm() {
    flex-basis: 45%;
  }

  @include lg() {
    flex-basis: 30%;
  }

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(212, 212, 212, 0.2);

    .thumbnail {
      img {
        box-shadow: 2px 2px 5px 2px rgba(43, 181, 75, 0.2);
      }

      .repoIcon {
        i {
          color: $green;
        }
      }
    }
  }

  .thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 8vh;
      height: 8vh;
      min-height: 40px;
      min-width: 40px;
      border-radius: $min-radius;
      transition: 0.2s;
    }

    .repoIcon {
      i {
        transition: 0.2s;
        font-size: 1.4rem;
      }
    }
  }

  .informations {
    display: flex;
    padding-left: 5%;
    min-width: 100px;
    flex-grow: 1;

    @include sm() {
      justify-content: start;
    }

    .userInfo {
      p {
        word-break: break-all;
        font-size: 1rem;

        @include sm() {
          font-size: 0.7rem;
        }

        @include md() {
          font-size: 0.8rem;
        }
      }
    }

    .repoInfo {
      display: flex;
      flex-direction: column;
      width: 100%;

      header {
        text-align: center;

        h5 {
          word-wrap: break-word;
          font-size: 0.6rem;
        }
      }

      main {
        display: flex;
        justify-content: space-between;
        margin-top: 1vh;
        flex-direction: column;

        .details {
          display: flex;
          justify-content: space-around;

          div {
            display: flex;
            margin: 2px;
            align-items: center;

            h5 {
              text-align: center;
              font-size: 0.7rem;
              font-weight: bold;
              word-wrap: break-word;

              @include sm() {
                font-size: 0.4rem;
              }

              @include md() {
                font-size: 0.5rem;
              }
            }

            i {
              font-size: 0.8rem;
              margin: 0 10px;
              color: $pink;
            }
          }

          .stars {
            i {
              color: $yellow;
            }
          }

          .lang {
            i {
              color: $blue;
            }
          }
        }
      }
    }
  }
}
</style>
