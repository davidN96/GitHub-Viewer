<template>
  <div class="searchResultsWrapper">
    <Loader v-if="fetchingData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Loader from '@/components/Loader/index.vue';
import UserTile from '@/components/UserTile/index.vue';
import { User, Repository } from '@/controllers/api/types';

@Component({ components: { Loader, UserTile } })
export default class SearchResult extends Vue {
  private fetchingData: boolean = true;
  private data: Array<User | Repository> = [];
}
</script>

<style lang="scss" scoped>
.searchResultsWrapper {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  padding: 13vh 0;
  max-width: $xl-min;
}
</style>
