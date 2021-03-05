<template>
  <PreviewSection :title="title">
    <SearchFilters
      :perPage="filters.perPage"
      :order="filters.order"
      :orderOptions="orderOptions"
      :sort="filters.sort"
      :sortOptions="sortOptions"
      @filtersChange="filtersChange"
      v-if="resultsCount"
    />
    <ResultsCounter
      :results="resultsCount"
      :page="page"
      :maxPage="maxPage"
      v-if="resultsCount"
    />
    <slot></slot>
    <h4 v-if="!resultsCount">
      {{ `No results found` }}
    </h4>
    <Paginator
      v-if="maxPage > 1"
      :page="page"
      :maxPage="maxPage"
      @pageChange="pageChange"
    />
  </PreviewSection>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as Global from '@/global';
import * as SearchUtils from '@/utils/search';
import * as APITypes from '@/controllers/api/types';

@Component
export default class PreviewList extends Vue {
  @Prop() private readonly title!: string;
  @Prop() private readonly sortOptions!: string[];
  @Prop() private readonly resultsCount!: number;

  private page: number = 1;
  private perPageOptions: number[] = Global.perPageOptions;
  private orderOptions: string[] = this.sortOptions?.length
    ? Global.orderOptions
    : [];

  private get maxPage(): number {
    return SearchUtils.countPages(this.resultsCount, this.filters.perPage);
  }

  private filters: Global.ExtendedSearchFilters = {
    sort: this.sortOptions?.length ? this.sortOptions[0] : null,
    order: APITypes.Order.desc,
    perPage: Global.perPageOptions[0],
  };

  private filtersChange(value: Global.ExtendedSearchFilters): void {
    this.filters = value;
  }

  private pageChange(page: number): void {
    this.page = page;
  }

  @Watch('filters.perPage')
  private handlePageChange(): void {
    if (this.page > this.maxPage) this.page = this.maxPage;
  }

  @Watch('filters', { deep: true })
  @Watch('page')
  private changeData(): void {
    this.$emit('changeData', { ...this.filters, page: this.page });
  }
}
</script>

<style lang="scss" scoped>
h4 {
  padding: 3vh 2vw;
  width: 100%;
  text-align: center;
}
</style>
