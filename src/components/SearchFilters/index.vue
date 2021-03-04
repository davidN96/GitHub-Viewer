<template>
  <div class="searchFilterWrapper">
    <form>
      <div>
        <label for="perPage">Per page:</label>
        <select id="perPage" v-model="perPage">
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
        <select id="sort" v-model="sort">
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
        <select id="order" v-model="order">
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
import { Order } from '@/controllers/api/types';
import * as Search from '@/utils/search';

@Component
export default class SearchFilter extends Vue {
  @Prop() private readonly perPageOptions!: number[];
  @Prop() private readonly sortOptions!: string[];
  @Prop() private readonly results!: number;

  private perPage: number = this.perPageOptions[0];
  private sort: string = this.sortOptions[0];
  private order: string = Order.desc;

  private get page(): string {
    return this.$route.params.page;
  }

  private get maxPage(): number {
    return Search.countPages(this.results, this.perPage);
  }

  @Watch('perPage')
  @Watch('order')
  @Watch('sort')
  private handleFiltersChange(): void {
    this.$emit('filtersChange', {
      perPage: this.perPage,
      sort: this.sort,
      order: this.order,
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
