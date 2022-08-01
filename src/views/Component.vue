<template>
  <div class="docs-component-page">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'component',
  components: {},
  setup() {
    return {};
  }
});
</script>

<style>
.docs-component-page {
  margin-bottom: 20px;
}
</style>
