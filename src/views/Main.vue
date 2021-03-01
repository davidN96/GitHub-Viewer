<template>
  <div class="mainWrapper">
    <form class="searchForm">
      <div class="searchBox">
        <input type="text" class="name" />
        <button>
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="selectMode"></div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Main extends Vue {}
</script>

<style lang="scss" scoped>
.mainWrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  .searchForm {
    display: flex;
    flex-direction: column;

    .searchBox {
      display: flex;

      .name {
        padding: 1vh 2vw;
        background-color: rgba(255, 255, 255, 0.8);
        outline: none;
        border: 1px solid $hoverGray;
        border-top-left-radius: $min-radius;
        border-bottom-left-radius: $min-radius;
        border-right: 2px solid $hoverGray;
        font-size: 1.2rem;

        &::selection {
          background-color: transparent;
          color: $green;
        }
      }

      button {
        display: flex;
        padding: 1vh 2vw;
        font-size: 1.2rem;
        border: 2px solid $green;
        border-top-right-radius: $min-radius;
        border-bottom-right-radius: $min-radius;
        outline: none;
        cursor: pointer;
        background-color: $green;
        color: $textWhite;
        align-items: center;

        @include md {
          padding: 1vh 1.2vw;
        }
      }
    }
  }
}
</style>
