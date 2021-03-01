<template>
  <div class="indicatorWrapper">
    <i class="fas fa-circle-notch"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LoaderIndicator extends Vue {}
</script>

<style lang="scss" scoped>
.indicatorWrapper {
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;

  i {
    font-size: 2.5rem;
    @include animate(spin, $animation-default-time, infinite);
    color: $green;
  }
}
</style>
