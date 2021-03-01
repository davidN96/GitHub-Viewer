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

@Component
export default class TopBar extends Vue {
  private get isOutOfMain(): boolean {
    return this.$route.name !== 'Main';
  }

  handleBack(): void {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.topBar_wrapper {
  display: flex;
  position: absolute;
  top: 0;
  padding: 2vh 5vw;
  width: 100vw;
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
      cursor: pointer;

      &:hover {
        i {
          color: $hoverGray;
          transition: 0.1s;
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
