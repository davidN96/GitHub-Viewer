<template>
  <div class="commitWrapper">
    <h4>{{ data.commit.message }}</h4>
    <p>{{ data.commit.author.name }}</p>
    <p>Commited on {{ date | unifyDate }} at {{ date | unifyTime }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as APITypes from '@/controllers/api/types';

@Component
export default class Commit extends Vue {
  @Prop() private readonly data!: APITypes.Commit;
  private readonly date: Date = new Date(this.data.commit.author.date);
}
</script>

<style lang="scss" scoped>
.commitWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1vh 2vw;
  border-radius: $min-radius;
  background: $cardBackground;
  margin: 0.7vh 1.5vw;
  padding: 2vh;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px 0px rgba(212, 212, 212, 0.2);
  }

  h4 {
    font-size: 0.9rem;
  }

  p:first-of-type {
    margin: 5px 0;
    font-size: 0.8rem;
    color: $hoverGray;
  }

  p:last-of-type {
    font-size: 0.7rem;
    text-align: right;
  }
}
</style>
