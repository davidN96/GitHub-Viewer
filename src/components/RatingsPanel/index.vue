<template>
  <div class="ratingsWrapper">
    <div class="stars">
      <i class="fas fa-star"></i>
      <p>{{ stargazers }}</p>
    </div>
    <div class="watchers">
      <i class="fas fa-glasses"></i>
      <p>{{ watchers }}</p>
    </div>
    <div class="forks">
      <i class="fas fa-code-branch"></i>
      <p>{{ forks }}</p>
    </div>
    <div class="issues">
      <i class="fas fa-bug"></i>
      <p>{{ issues }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Ratings extends Vue {
  @Prop() private readonly stargazers!: number;
  @Prop() private readonly watchers!: number;
  @Prop() private readonly forks!: number;
  @Prop() private readonly issues!: number;
}
</script>

<style lang="scss" scoped>
.ratingsWrapper {
  display: flex;
  color: $hoverGray;
  justify-content: space-around;
  width: 100%;

  @include sm() {
    justify-content: flex-start;
  }

  div {
    display: flex;
    align-items: center;

    i {
      margin: 0 2vw 0 0;
      font-size: 1.2rem;
    }

    p {
      font-size: 1.2rem;
      margin-right: 4vw;
    }
  }

  .issues {
    i {
      color: $red;
    }
  }

  .forks {
    i {
      color: $blue;
    }
  }

  .watchers {
    i {
      color: $lightBlue;
    }
  }

  .stars {
    i {
      color: $yellow;
    }
  }
}
</style>
