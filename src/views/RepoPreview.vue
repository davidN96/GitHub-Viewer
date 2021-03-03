<template>
  <div class="repoPreviewWrapper">
    <h1>Repository</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RepoPreview extends Vue {}
</script>

<style lang="scss" scoped>
.repoPreviewWrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
