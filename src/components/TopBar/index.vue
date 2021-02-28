<template>
  <div class="topBar_wrapper">
    <header>
      <div class="back">
        <i class="fas fa-arrow-left"></i>
      </div>
      <router-link to="/">
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
  mounted() {
    const currentRoute: string | null | undefined = this.$route.name;

    console.log(currentRoute);
  }
}
</script>

<style lang="scss" scoped>
.topBar_wrapper {
  display: flex;
  padding: 2vh 5vw;
  width: 100vw;
  justify-content: center;
  background-color: $darkGray;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.75);

  header {
    display: flex;
    width: 100%;
    max-width: $lg-min;
    justify-content: space-between;

    .back {
      cursor: pointer;
    }

    i {
      color: $white;
      font-size: 2rem;
    }
  }
}
</style>
