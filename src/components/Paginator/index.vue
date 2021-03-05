<template>
  <div class="paginatorWrapper">
    <button @click="handlePrevPage" :disabled="page === 1 || disabled">
      <i class="fas fa-chevron-circle-left"></i>
    </button>
    <button @click="handleNextPage" :disabled="page === maxPage || disabled">
      <i class="fas fa-chevron-circle-right"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Paginator extends Vue {
  @Prop() readonly page!: number;
  @Prop() readonly maxPage!: number;
  @Prop() readonly disabled: boolean | null = null;

  private handleNextPage(): void {
    this.$emit('pageChange', this.page + 1);
  }

  private handlePrevPage(): void {
    this.$emit('pageChange', this.page - 1);
  }
}
</script>

<style lang="scss" scoped>
.paginatorWrapper {
  display: flex;
  width: 100%;
  padding: 5vh 0 2vh;
  justify-content: center;

  button {
    margin: 0 2vh;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    border: none;
    transition: 0.2s;

    &:disabled {
      opacity: 0.6;
    }

    &:disabled:hover {
      transform: scale(1);
      i {
        color: $green;
      }
    }

    &:hover {
      transform: scale(1.2);

      i {
        color: $hoverGreen;
      }
    }

    i {
      font-size: 1.8rem;
      color: $green;
    }
  }
}
</style>
