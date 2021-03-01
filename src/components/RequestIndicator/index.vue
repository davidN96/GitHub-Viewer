<template>
  <div class="requestIndicatorWrapper">
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
                  warning: searchCount < 5,
                  success: searchCount > 5,
                }"
              >
                {{ searchCount }}
              </h4>
            </div>
            <div class="requestCount">
              <h4>Profile:</h4>
              <h4
                :class="{
                  error: profileCount < 3,
                  warning: profileCount < 5,
                  success: profileCount > 5,
                }"
              >
                {{ profileCount }}
              </h4>
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

@Component
export default class RequestIndicatorr extends Vue {
  private isActive: boolean = false;
  private searchCount: number = 10;
  private profileCount: number = 60;

  private handleActivation(): void {
    this.isActive = !this.isActive;
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

      @include sm() {
        width: 40vw;
      }

      padding: 5vh 2vw;
      text-align: center;

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
