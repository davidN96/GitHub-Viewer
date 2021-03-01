<template>
  <div class="mainWrapper">
    <form class="searchForm">
      <label for="mode"
        >Please enter
        {{ searchMode }}
        name
      </label>
      <input
        type="text"
        class="name"
        placeholder="Enter keyword..."
        autocomplete="off"
        v-model="keyWord"
      />

      <label for="mode">What are you looking for?</label>
      <select name="mode" id="mode" v-model="searchMode">
        <option v-for="option in modeOptions" :value="option" :key="option">{{
          option | capitalize
        }}</option>
      </select>
      <router-link :to="`/search/${searchMode}/${keyWord}`">
        <button :disabled="keyWord.length < 3">
          <i class="fas fa-search"></i>
          Search
        </button>
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SearchMode } from '@/global.ts';

@Component
export default class Main extends Vue {
  private modeOptions: string[] = [SearchMode.user, SearchMode.repo];
  private searchMode: string = SearchMode.user;
  private keyWord: string = '';
  private searchRoute: string = '';
}
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

    #mode {
      padding: 0.7rem 2vw;
      margin-top: 1vh;
      margin-bottom: 4vh;
      background-color: $inputBackground;
      font-size: 1.3rem;
      border-radius: $min-radius;
      border: 2px solid $hoverGray;
      text-align-last: center;
      transition: 0.2s;
      cursor: pointer;

      @include sm() {
        padding: 0.4rem 2vw;
      }

      &:focus {
        border-color: $green;
      }
    }

    .name {
      padding: 0.8rem 2vw;
      margin-top: 1vh;
      margin-bottom: 3vh;
      background-color: $inputBackground;
      outline: none;
      border: 2px solid $hoverGray;
      border-radius: $min-radius;
      border-right: 2px solid $hoverGray;
      font-size: 1.2rem;
      text-align: center;
      transition: 0.2s;
      cursor: pointer;
      outline: none;

      @include sm() {
        padding: 0.5rem 2vw;
      }

      &::selection {
        background-color: transparent;
        color: $green;
      }

      &:focus {
        border-color: $green;
      }
    }

    button {
      width: 100%;
      margin-top: 2vh;
      padding: 0.8rem 2vw;
      font-size: 1.2rem;
      border: 2px solid $green;
      border-radius: $min-radius;
      outline: none;
      cursor: pointer;
      background-color: $green;
      color: $textWhite;
      transition: 0.15s;
      z-index: 0;

      @include sm() {
        padding: 0.5rem 2vw;
      }

      &:hover {
        background-color: $hoverGreen;
      }

      &:disabled {
        opacity: 0.5;
      }

      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
