<template>
  <div class="notFoundWrapper">
    <div class="logo">
      <i class="fab fa-quinscape"></i>
    </div>
    <div class="title">
      <h2>Ooops!</h2>
      <h3>This page doesn't exists...</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
.notFoundWrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  .logo {
    margin: 2vh 0;
    i {
      font-size: 4rem;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    text-align: center;

    h2 {
      margin: 1vh 0;
    }
  }
}
</style>
