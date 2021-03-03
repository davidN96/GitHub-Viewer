<template>
  <div class="loaderWrapper" :class="{ fadeIn: isActive, fadedOut: !isActive }">
    <LoaderIndicator />
    <h4 class="info">{{ title }}</h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LoaderIndicator from '@/components/LoaderIndicator/index.vue';

@Component({
  components: { LoaderIndicator },
})
export default class Loader extends Vue {
  @Prop({ default: 'Fetching data...' }) private title!: string;
  @Prop(Boolean) private isActive!: boolean;
}
</script>

<style lang="scss" scoped>
.loaderWrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: visibility 0.2s;
  z-index: 11;

  .info {
    margin-top: 2vh;
  }
}
</style>
