<template>
  <div class="resultsWrapper">
    <h5>Current page: {{ page }}</h5>
    <h5>Pages: {{ maxPage }}</h5>
    <h5>Results: {{ results }}</h5>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ResultsCounter extends Vue {
  @Prop() private readonly results!: number;
  @Prop() private readonly page!: number;
  @Prop() private readonly maxPage!: number;
}
</script>

<style lang="scss" scoped>
.resultsWrapper {
  display: flex;
  padding: 0 2vw;
  margin-bottom: 3vh;
  width: 100%;

  h5 {
    margin: 5px 2vw 0 0;
    font-size: 0.8rem;
  }
}
</style>
