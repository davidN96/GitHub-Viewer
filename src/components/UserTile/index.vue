<template>
  <div class="userTileWrapper">
    <div class="thumbnail">
      <img :src="user.avatar_url" alt="avatar" />
    </div>
    <div class="informations">
      <h4>{{ user.login }}</h4>
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
  width: 80vw;
  align-items: center;
  padding: 2vh 2vw;
  border: 1px solid $darkGray;
  border-radius: $min-radius;
  background-color: $cardBackground;
  cursor: pointer;

  @include sm() {
    width: 26.66vw;
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
    flex-grow: 1;
    justify-content: center;
    margin-left: -8vh;
  }
}
</style>
