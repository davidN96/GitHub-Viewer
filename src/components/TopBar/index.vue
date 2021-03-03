<template>
  <div class="topBar_wrapper">
    <header>
      <div class="back">
        <div class="backBtnWrapper" v-if="isOutOfMain" @click="handleBack">
          <i class="fas fa-arrow-left"></i>
        </div>
      </div>
      <router-link :to="{ name: 'Main' }">
        <div class="logo">
          <i class="fab fa-github"></i>
        </div>
      </router-link>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class TopBar extends Vue {
  private get isOutOfMain(): boolean {
    return this.$route.name !== 'Main';
  }

  handleBack(): Promise<Route> | void {
    switch (this.$route.name) {
      case 'Search':
        return this.$router.push({ path: '/' });

      default:
        return this.$router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
.topBar_wrapper {
  display: flex;
  position: fixed;
  top: 0;
  padding: 2vh 5vw;
  width: 100%;
  justify-content: center;
  background-color: $darkGray;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.75);
  z-index: 10;

  header {
    display: flex;
    width: 100%;
    max-width: $xl-min;
    justify-content: space-between;

    .back {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: $white;

      i {
        font-size: 1.5rem;

        &:hover {
          color: $green;
          transition: 0.2s;
        }
      }
    }

    i {
      color: $white;
      font-size: 2rem;
    }
  }
}
</style>
