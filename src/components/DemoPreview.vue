<template>
  <div class="doc-demo-preview">
    <iframe :src="url" v-if="reload" frameborder="0" ref="demoIframe"></iframe>
    <demo-icon @refresh="onRefresh()" @goHome="onGoHome()"></demo-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs, nextTick } from 'vue';
import Icon from '@/components/Icon.vue';
export default defineComponent({
  name: 'doc-demo-preview',
  components: {
    [Icon.name]: Icon
  },
  props: {
    url: String
  },
  setup(props: any, { emit }: any) {
    const demoIframe = ref(null);

    const state = reactive({
      reload: true
    });

    onMounted(() => {});

    const onGoHome = () => {
      console.log('onGoHome');
      emit('goHome');
    };

    const onRefresh = () => {
      state.reload = false;
      nextTick(() => {
        state.reload = true;
      });
      console.log('onRefresh');
      emit('onRefresh');
    };

    return {
      ...toRefs(state),
      demoIframe,
      onRefresh,
      onGoHome
    };
  }
});
</script>

<style lang="scss">
.doc {
  &-demo-preview {
    // height: 667px;
    height: calc(100vh - 161px);
    width: 375px;
    position: absolute;
    right: 30px;
    // top: 240px;
    top: 200px;
    box-shadow: #ebedf0 0 4px 12px;
    border-radius: 12px;
    overflow: hidden;
    &.fixed {
      position: fixed;
      top: 120px;
    }

    iframe {
      height: calc(100% - 40px);
      // height: 100%;
      width: 100%;
    }
  }
}
</style>
