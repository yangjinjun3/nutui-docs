<template>
  <div class="doc-content-issue" v-if="isShowReact()">
    <a class="issue-item" href="https://github.com/jdf2e/nutui-react/issues" target="_blank">
      <Icon name="uploader"></Icon>
      Issue
    </a>
    <a
      class="issue-item"
      :href="'https://github.com/jdf2e/nutui-react/issues?q=is:issue+is:open+' + component"
      target="_blank"
    >
      <Icon name="issue"></Icon>
      Open
    </a>
    <a
      class="issue-item"
      :href="'https://github.com/jdf2e/nutui-react/issues?q=is:issue+is:closed+' + component"
      target="_blank"
    >
      <Icon name="checklist"></Icon>
      Closed
    </a>
  </div>
  <div class="doc-content-issue" v-else>
    <a class="issue-item" href="https://github.com/jdf2e/nutui/issues" target="_blank">
      <Icon name="uploader"></Icon>
      Issue
    </a>
    <a
      class="issue-item"
      :href="'https://github.com/jdf2e/nutui/issues?q=is:issue+is:open+' + component"
      target="_blank"
    >
      <Icon name="issue"></Icon>
      Open
    </a>
    <a
      class="issue-item"
      :href="'https://github.com/jdf2e/nutui/issues?q=is:issue+is:closed+' + component"
      target="_blank"
    >
      <Icon name="checklist"></Icon>
      Closed
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { RefData } from '@/sites/assets/util/ref';
import { language } from '@/config/index';
import { Icon } from '@nutui/nutui';
export default defineComponent({
  name: 'doc-issue',
  components: {
    Icon
  },
  setup() {
    const route = useRoute();

    const state = reactive({
      component: ''
    });

    const watchDemoUrl = (router: RouteLocationNormalized) => {
      state.component = router.name;
    };

    const isShowReact = () => {
      return language === 'react';
    };

    onMounted(() => {
      watchDemoUrl(route);
    });

    onBeforeRouteUpdate((to) => {
      watchDemoUrl(to);
    });

    return {
      ...toRefs(state),
      isShowReact
    };
  }
});
</script>

<style lang="scss" scoped>
.doc-content-issue {
  // position: absolute;
  // right: 605px;
  // top: 51px;
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 4px;
  height: 40px;
  // background: var(--bg-color-component-transparent);
  border-radius: 6px;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 7px 0px #edeef1;
  .issue-item {
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    transition: all 0.2s ease 0s;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    line-height: 22px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    text-decoration: none;
    border-radius: 2px;
    .nut-icon {
      font-size: 12px;
      // width: 16px;
      // height: 16px;
      margin-right: 5px;
    }
    &:hover {
      color: #000;
      background: rgba(64, 69, 82, 0.1);
    }
  }
}
</style>
