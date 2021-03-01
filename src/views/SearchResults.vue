<template>
  <div class="searchResultsWrapper">
    <Loader v-if="fetchingData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Loader from '@/components/Loader.vue';

@Component({ components: { Loader } })
export default class SearchResult extends Vue {
  private fetchingData: boolean = false;
}
</script>

<style lang="scss" scoped>
.searchResultsWrapper {
  display: flex;
  flex-grow: 1;
  z-index: -1;
}
</style>
