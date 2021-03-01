<template>
  <div id="app">
    <TopBar />
    <RequestIndicator />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopBar from '@/components/TopBar.vue';
import RequestIndicator from '@/components/RequestIndicator.vue';

@Component({
  components: { TopBar, RequestIndicator },
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
