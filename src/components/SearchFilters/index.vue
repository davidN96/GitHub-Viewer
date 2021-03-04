<template>
  <div class="searchFilterWrapper">
    <form>
      <div>
        <label for="perPage">Per page:</label>
        <select id="perPage" v-model="currentPerPage">
          <option
            v-for="number in perPageOptions"
            :key="number"
            :valie="number"
            >{{ number }}</option
          >
        </select>
      </div>
      <div>
        <label for="sort">Sort by:</label>
        <select id="sort" v-model="currentSort">
          <option
            v-for="sortOption in sortOptions"
            :value="sortOption"
            :key="sortOption"
            >{{ sortOption | capitalize }}</option
          >
        </select>
      </div>
      <div>
        <label for="order">Order:</label>
        <select id="order" v-model="currentOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
    <div class="results">
      <h5>Current page: {{ page }}</h5>
      <h5>Pages: {{ maxPage }}</h5>
      <h5>Results: {{ results }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as Search from '@/utils/search';

@Component
export default class SearchFilter extends Vue {
  @Prop() private readonly perPageOptions!: number[];
  @Prop() private readonly sortOptions!: string[];
  @Prop() private readonly results!: number;
  @Prop() private readonly currentPage: number | undefined;
  @Prop() private readonly type!: string;
  @Prop() private sort!: string;
  @Prop() private order!: string;
  @Prop() private perPage!: number;

  private currentSort: string = this.sort;
  private currentOrder: string = this.order;
  private currentPerPage: number = this.perPage;

  private get page(): number {
    if (this.currentPage) return this.currentPage;
    else return parseInt(this.$route.params.page);
  }

  private get maxPage(): number {
    return Search.countPages(this.results, this.perPage);
  }

  @Watch('currentPerPage')
  @Watch('currentOrder')
  @Watch('currentSort')
  private handleFiltersChange(): void {
    this.$emit('filtersChange', this.type, {
      perPage: this.currentPerPage,
      sort: this.currentSort,
      order: this.currentOrder,
    });
  }
}
</script>

<style lang="scss" scoped>
.searchFilterWrapper {
  display: flex;
  width: 100%;
  padding: 2vh 1.5vw;
  margin: 2vh 0 3vh;
  flex-wrap: wrap;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      flex-direction: column;

      @include md() {
        flex-direction: row;
      }
    }

    label {
      font-size: 0.8rem;

      @include md() {
        font-size: 0.9rem;
      }
    }

    #perPage,
    #sort,
    #order {
      padding: 5px;
      margin: 1vh 1vw;
      font-size: 0.75rem;
      background-color: transparent;
      border: 2px solid $white;
      border-radius: $min-radius;
      color: $white;
      cursor: pointer;
      transition: 0.2s;

      @include md() {
        font-size: 0.9rem;
      }

      &:hover {
        color: $green;
        border-color: $green;
      }

      option {
        color: black;
      }
    }
  }

  .results {
    display: flex;
    width: 100%;

    h5 {
      margin: 5px 2vw 0 0;
      font-size: 0.8rem;
    }
  }
}
</style>
