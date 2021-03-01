<template>
  <div>
    <h2>
      You are looking for {{ $route.params.mode }} with
      {{ $route.params.keyword }} keyword
    </h2>
    <LoaderIndicator />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoaderIndicator from '@/components/LoaderIndicator.vue';

@Component({ components: { LoaderIndicator } })
export default class SearchResult extends Vue {}
</script>
