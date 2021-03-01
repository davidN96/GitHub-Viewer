<template>
  <div id="app">
    <TopBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopBar from '@/components/TopBar.vue';

@Component({
  components: { TopBar },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
