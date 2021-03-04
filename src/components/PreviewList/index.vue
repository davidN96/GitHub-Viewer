<template>
  <PreviewSection :title="title">
    <SearchFilters
      :perPage="perPage"
      :perPageOptions="perPageOptions"
      :order="order"
      :orderOptions="orderOptions"
      :sort="sort"
      :sortOptions="sortOptions"
      :type="type"
      @filtersChange="handleFiltersChange"
    />
    <ResultsCounter :results="resultsCount" :page="page" :maxPage="maxPage" />
    <slot></slot>
    <h4 v-if="!resultsCount">
      No repositories found
    </h4>
    <Paginator
      v-if="maxPage > 1"
      :page="page"
      :maxPage="maxPage"
      @pageChange="handlePageChange"
    />
  </PreviewSection>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PreviewList extends Vue {
  @Prop() private readonly title!: string;
}
</script>

<style lang="scss" scoped></style>
