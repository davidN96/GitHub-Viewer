<template>
  <div class="previewSectionWrapper">
    <header>
      <h3>{{ title }}</h3>
      <div class="control">
        <div class="show" v-if="!isVisible" @click="isVisible = true">
          <i class="fas fa-plus"></i>
        </div>
        <div class="hide" v-if="isVisible" @click="isVisible = false">
          <i class="fas fa-minus"></i>
        </div>
      </div>
    </header>
    <div class="container" :class="{ rolled: !isVisible, unrolled: isVisible }">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PreviewSection extends Vue {
  @Prop() title!: string;
  private isVisible: boolean = true;
}
</script>

<style lang="scss" scoped>
.previewSectionWrapper {
  display: flex;
  width: 100%;
  min-height: 60px;
  background-color: $backgroudGray;
  border-radius: $min-radius;
  padding: 2vh 3vw;
  margin-top: 10px;
  flex-direction: column;

  .container {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    h4 {
      color: #8b949e;
      font-weight: normal;
    }
  }

  header {
    display: flex;
    align-items: center;
    min-height: 60px;
    width: 100%;
    justify-content: space-between;

    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      cursor: pointer;

      i {
        font-size: 1.2rem;
        transition: 0.2s;
      }

      &:hover {
        background-color: $green;

        i {
          color: $darkGray;
        }
      }
    }
  }
}
</style>
