<template>
  <div class="requestIndicatorWrapper">
    <ErrorModal
      v-if="isCrashed"
      :title="'Sorry'"
      :message="'API error ocurred, please refresh page or try again later'"
    />
    <div
      class="requestIndicatorBackdrop"
      :class="{ fadedIn: isActive, fadedOut: !isActive }"
      @click="handleActivation"
    >
      <div class="requestIndicatorModal" :class="{ fadedOut: !isActive }">
        <h3>GitHub API</h3>
        <h4>
          Because of GitHub API rate limitations the quantity of request are
          restricted.
        </h4>
        <div class="requests">
          <header>
            <h4>Possible requests:</h4>
          </header>
          <main>
            <div class="requestCount">
              <h4>Search:</h4>
              <h4
                :class="{
                  error: searchCount < 3,
                  warning: searchCount <= 5,
                  success: searchCount > 5,
                }"
              >
                {{ searchCount }}
              </h4>
              <h5>Next reset:</h5>
              <p>
                {{ nextSearchRequest | unifyDate }}
              </p>
              <p>
                {{ nextSearchRequest | unifyTime }}
              </p>
            </div>
            <div class="requestCount">
              <h4>Profile:</h4>
              <h4
                :class="{
                  error: profileCount < 3,
                  warning: profileCount <= 5,
                  success: profileCount > 5,
                }"
              >
                {{ profileCount }}
              </h4>
              <h5>Next reset:</h5>
              <p>
                {{ nextSearchRequest | unifyDate }}
              </p>
              <p>
                {{ nextSearchRequest | unifyTime }}
              </p>
            </div>
          </main>
        </div>
        <footer>
          <p>
            Click
            <a href="https://api.github.com/">here</a>
            to check API
          </p>
        </footer>
      </div>
    </div>
    <div class="requestIndicatorActivator" @click="handleActivation">
      <i class="fas fa-info-circle"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RateLimitResponse, RateLimit } from '@/controllers/api/types';
import { convertTimeStampToDateTime } from '@/utils/date';
import API from '@/controllers/api';

@Component
export default class RequestIndicator extends Vue {
  private isActive: boolean = false;
  private isCrashed: boolean = false;
  private get nextSearchRequest(): Date {
    return this.$store.state.requests.search.nextRequest || new Date();
  }

  private get searchCount(): number {
    return this.$store.state.requests.search.quantity;
  }
  private get profileCount(): number {
    return this.$store.state.requests.profile.quantity;
  }

  private handleActivation(): void {
    this.isActive = !this.isActive;
  }

  private async refreshRateLimit(): Promise<void> {
    try {
      const currentLimit: RateLimitResponse = await API.getRateLimit();
      const searchLimit: RateLimit = currentLimit.resources.search;
      const profileLimit: RateLimit = currentLimit.resources.core;

      this.$store.commit('setRequestCount', {
        type: 'search',
        reset: convertTimeStampToDateTime(profileLimit.reset),
        quantity: searchLimit.limit,
      });

      this.$store.commit('setRequestCount', {
        type: 'profile',
        reset: convertTimeStampToDateTime(profileLimit.reset),
        quantity: profileLimit.limit,
      });
    } catch (error) {
      this.isCrashed = true;
    }
  }

  async mounted(): Promise<void> {
    await this.refreshRateLimit();
  }
}
</script>

<style lang="scss" scoped>
.requestIndicatorWrapper {
  .requestIndicatorBackdrop {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 11;
    transition: visibility 0.2s;
    cursor: pointer;

    .requestIndicatorModal {
      display: flex;
      position: absolute;
      flex-direction: column;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: $darkGray;
      width: 80vw;
      min-height: 45vh;
      border-radius: 15px;
      justify-content: center;
      align-items: center;
      transition: visibility 0.2s;
      padding: 5vh 2vw;
      text-align: center;

      @include sm() {
        width: 40vw;
      }

      h3 {
        margin-bottom: 2vh;
      }

      .requests {
        width: 100%;
        margin: 5vh 0;
        padding-top: 5vh;
        border-top: 1px solid $hoverGray;

        header {
          width: 100%;
        }

        main {
          display: flex;
          margin-top: 2vh;
          justify-content: space-around;

          .requestCount {
            p {
              font-size: 0.7rem;
            }
          }
        }
      }

      footer {
        display: flex;
        padding-top: 2vh;
        border-top: 1px solid $hoverGray;
        width: 100%;
        justify-content: space-around;

        p {
          a {
            color: $green;
            font-weight: bold;

            &:hover {
              color: $hoverGreen;
            }
          }
        }
      }
    }
  }

  .requestIndicatorActivator {
    display: flex;
    position: fixed;
    bottom: 2vh;
    right: 2vh;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    z-index: 11;

    &:hover {
      i {
        transform: scale(1.1);
      }
    }

    @include sm() {
      bottom: 4vh;
    }

    i {
      color: $green;
      font-size: 2rem;
      transition: 0.1s;
    }
  }
}
</style>
