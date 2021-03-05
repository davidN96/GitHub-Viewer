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
      <div v-if="sortOptions">
        <label for="sort">Sort by:</label>
        <select id="sort" v-model="currentSort">
          <option
            v-for="sortOption in sortOptions"
            :value="sortOption"
            :key="sortOption"
            >{{ sortOption | removeSpecialChars | capitalize }}</option
          >
        </select>
      </div>
      <div v-if="orderOptions.length">
        <label for="order">Order:</label>
        <select id="order" v-model="currentOrder">
          <option
            v-for="option in orderOptions"
            :key="option"
            :value="option"
            >{{ option | capitalize }}</option
          >
        </select>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as Global from '@/global';

@Component
export default class SearchFilter extends Vue {
  @Prop() private readonly sortOptions!: string[];
  @Prop() private readonly orderOptions!: string[];
  @Prop() private sort!: string;
  @Prop() private order!: string;
  @Prop() private perPage!: number;

  private currentSort: string = this.sort;
  private currentOrder: string = this.order;
  private currentPerPage: number = this.perPage;
  private perPageOptions: number[] = Global.perPageOptions;

  @Watch('currentPerPage')
  @Watch('currentOrder')
  @Watch('currentSort')
  private filtersChange(): void {
    this.$emit('filtersChange', {
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
  margin: 2vh 0 1.5vh;
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
}
</style>
