<template>
  <div id="app">
    <TopBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopBar from '@/components/TopBar/index.vue';

@Component({
  components: { TopBar },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
