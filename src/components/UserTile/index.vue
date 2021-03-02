<template>
  <div class="userTileWrapper">
    <div class="thumbnail">
      <img :src="user.avatar_url" alt="avatar" />
    </div>
    <div class="informations">
      <p>{{ user.login }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/controllers/api/types.ts';

@Component
export default class UserTile extends Vue {
  @Prop() readonly user!: User;
}
</script>

<style lang="scss" scoped>
.userTileWrapper {
  display: flex;
  width: 90%;
  align-items: center;
  margin: 1vh 0;
  padding: 2vh 2vw;
  border: 1px solid $darkGray;
  border-radius: $min-radius;
  background-color: $cardBackground;
  cursor: pointer;

  @include sm() {
    width: 30%;
    margin: 1vh 1.5%;
  }

  .thumbnail {
    display: flex;
    align-items: center;
    img {
      width: 8vh;
      height: 8vh;
      min-height: 40px;
      min-width: 40px;
      border-radius: $min-radius;
    }
  }

  .informations {
    display: flex;
    padding-left: 10%;

    p {
      text-align: center;
      word-break: break-all;
    }
  }
}
</style>
