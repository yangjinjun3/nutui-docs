<template>
  <div>
    <doc-header></doc-header>
    <doc-nav></doc-nav>
    <div class="doc-content">
      <div class="doc-title" v-if="isShow()">
        <div class="doc-title-position" :class="{ fixed: fixed, hidden: hidden }">
          <div class="title">{{ componentName.name }}&nbsp;{{ isZh ? componentName.cName : '' }}</div>
          <doc-issue class=""></doc-issue>
        </div>
      </div>
      <div class="doc-content-document" :class="{ isComponent: isShow(), full: !isShow() }">
        <div class="doc-content-tabs" v-if="isShow() && isShowTaroDoc && language == 'vue'">
          <div
            class="tab-item"
            :class="{ cur: curKey === item.key }"
            v-for="item in tabs"
            :key="item.key"
            @click="handleTabs(item.key)"
            >{{ item.text }}</div
          >
        </div>
        <div class="doc-content-tabs single" v-if="isShow() && !isShowTaroDoc && language == 'vue'">
          <div class="tab-item cur">vue / taro</div>
        </div>

        <router-view />

        <div class="doc-content-faq" v-if="faqsList.length && isShow() && language == 'vue' && curKey === 'vue'">
          <div class="doc-content-faq-title">FAQ</div>

          <div class="doc-content-faq-item" v-for="faq in faqsList" :key="faq.id">
            <div class="doc-content-faq-que">{{ faq.question }}</div>
            <div class="doc-content-faq-aws" v-html="faq.answer.replace(/>[\t\s]*</gm, '><')"></div>
          </div>
        </div>

        <div :class="{ 'doc-content-contributors': true }" v-if="isShow() && contributorsData.length !== 0">
          <a
            :href="'https://github.com/' + item.username"
            v-for="(item, index) in contributorsData"
            :key="index + 'Contributor'"
          >
            <img :src="item.url" alt="" />
            <div class="contributors-hover">贡献者:{{ item.username }}</div>
          </a>
        </div>
        <doc-footer v-if="isShow()" :showLogo="false"></doc-footer>
      </div>
      <doc-demo-preview v-if="isShow()" :url="demoUrl" :class="{ fixed: fixed }"></doc-demo-preview>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed, ref } from 'vue';
import { demoUrl, language, nav, docs } from '@/config/index';
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import HeaderJDT from '@/docs_jdt/Header.vue';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import DemoPreview from '@/components/DemoPreview.vue';
import Issue from '@/components/Issue.vue';
import { RefData } from '@/assets/util/ref';
import { ApiService } from '@/service/ApiService';
import { Button } from '@nutui/nutui';
import { isJDT } from '@/assets/util';
import { useLocale } from '@/assets/util/locale';

export default defineComponent({
  name: 'doc',
  components: {
    [Header.name]: isJDT() ? HeaderJDT : Header,
    [Nav.name]: Nav,
    [Footer.name]: Footer,
    [DemoPreview.name]: DemoPreview,
    [Issue.name]: Issue,
    Button
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { isZh } = useLocale();
    const state = reactive({
      fixed: false, // 是否吸顶
      hidden: false, // 是否隐藏
      // 组件名称
      componentName: {
        name: '',
        cName: ''
      }
    });

    const data = reactive({
      demoUrl: 'demo.html',
      curKey: 'vue',
      tabs: [
        {
          key: 'vue',
          text: 'vue'
        },
        {
          key: 'taro',
          text: 'taro'
        }
      ]
    });
    const contributorsData = ref([]); //贡献者表格

    const faqsList = ref([]); // 组件的faq

    const configNav = computed(() => {
      let tarodocs = [] as string[];
      nav.map((item: any) => {
        item.packages.forEach((element: any) => {
          let { tarodoc, name } = element;
          if (tarodoc) {
            tarodocs.push(name.toLowerCase());
            tarodocs.push(`${name.toLowerCase()}-taro`);
          }
        });
      });
      return tarodocs;
    });

    const isTaro = (router: RouteLocationNormalized) => {
      return router.path.indexOf('taro') > -1;
    };

    const isShow = () => {
      return !route.path.includes('guide');
    };

    const isShowTaroDoc = computed(() => {
      let routename = route.path.toLocaleLowerCase().split('/').pop() || '';
      return configNav.value.findIndex((item) => item === routename) > -1;
    });

    // 获取 FAQ 内容
    const getFaqs = (router: RouteLocationNormalized) => {
      const apiService = new ApiService();
      let routename = router.path.toLocaleLowerCase().split('/').pop() || '';
      apiService.getSingleFaq(routename.split('-')[0]).then((res) => {
        if (res && res.state == 0) {
          faqsList.value = res.value.data;
        }
      });
    };

    const getContributors = (router: RouteLocationNormalized) => {
      // 贡献者列表接口
      const apiService = new ApiService();
      let routename = router.path.toLocaleLowerCase().split('/').pop() || '';

      if (window.location.href.indexOf('react') != -1) {
        // apiService.getReactContributors(routename.split('-')[0]).then((resList) => {
        //   const githubContributors: { [key: string]: any } = {};
        //   resList.forEach((res) => {
        //     if (!res.data.message && res.status == 200 && Array.isArray(res?.data)) {
        //       res.data.forEach((i) => {
        //         const author = i.author;
        //         if (author && author.login) {
        //           githubContributors[author.login] = { username: author.login, url: author.avatar_url };
        //         }
        //       });
        //     }
        //   });
        //   contributorsData.value = Object.keys(githubContributors).map((k) => githubContributors[k]) as any;
        // });
      } else {
        apiService.getContributors(routename.split('-')[0]).then((res) => {
          if (res && res.state == 0) {
            contributorsData.value = res.value.data;
          }
        });
      }
    };

    const watchDemoUrl = (router: RouteLocationNormalized) => {
      const { origin, pathname } = window.location;
      RefData.getInstance().currentRoute.value = router.name as string;
      // data.demoUrl = `${origin}${pathname.replace('index.html', '')}demo.html#${router.path}`;
      data.demoUrl = `${demoUrl}/${router.path.toLocaleLowerCase().split('/').pop()}`;
    };

    const watchDocMd = (curKey: string) => {
      const path = route.path.toLocaleLowerCase();
      // router.replace(isTaro(route) ? path.substr(0, path.length - 5) : `${path}-taro`);
      if (curKey.includes('taro')) {
        router.replace(isTaro(route) ? path : `${path}-taro`);
      } else {
        router.replace(isTaro(route) ? path.substr(0, path.length - 5) : path);
      }
    };

    const handleTabs = (curKey: string) => {
      data.curKey = curKey;
      watchDocMd(curKey);
    };

    onMounted(async () => {
      componentTitle();
      watchDemoUrl(route);
      data.curKey = isTaro(route) ? 'taro' : 'vue';
      getContributors(route);

      document.addEventListener('scroll', scrollTitle);
      getFaqs(route);
    });

    const scrollTitle = () => {
      let top = document.documentElement.scrollTop;
      // console.log('state.hidden', state.hidden)
      if (top > 127) {
        state.fixed = true;
        if (top < 142) {
          state.hidden = true;
        } else {
          state.hidden = false;
        }
      } else {
        state.fixed = false;
        state.hidden = false;
      }
    };
    // 获得组件名称
    const componentTitle = (to?: any) => {
      let routename = '';
      if (to?.name) {
        routename = to.path.toLocaleLowerCase().split('/').pop() || '';
      } else {
        routename = route.path.toLocaleLowerCase().split('/').pop() || '';
      }
      state.componentName.name = routename;
      nav.forEach((i: any) => {
        i.packages.forEach((item: any) => {
          if (item.name.toLowerCase() == state.componentName.name) {
            state.componentName.name = item.name;
            state.componentName.cName = item.cName;
            return;
          }
        });
      });
    };

    onBeforeRouteUpdate((to) => {
      watchDemoUrl(to);
      data.curKey = isTaro(to) ? 'taro' : 'vue';
      getContributors(to);
      componentTitle(to);
      getFaqs(to);
    });

    return {
      ...toRefs(state),
      ...toRefs(data),
      handleTabs,
      faqsList,
      isShow,
      isShowTaroDoc,
      language,
      contributorsData,
      isZh
    };
  }
});
</script>

<style lang="scss" scoped>
$doc-title-height: 137px;
.doc {
  &-content {
    margin-left: 290px;
    display: flex;
    flex-direction: column;

    &-document {
      min-height: 800px;

      .markdown-body {
        min-height: 600px;
      }
    }
    &-tabs {
      position: absolute;
      right: 475px;
      top: 48px;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      z-index: 1;
      padding: 2px;
      box-sizing: border-box;

      border-radius: 2px;
      background: #eee;
      box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px;
      &.single {
        padding: 0;
        .tab-item {
          line-height: 40px;
          cursor: auto;
        }
      }
      .tab-item {
        position: relative;
        padding: 0 10px;
        line-height: 36px;
        cursor: pointer;
        font-size: 16px;
        color: #323232;
        text-align: center;
        border-radius: 2px;
        background: #eee;
        &.cur {
          font-weight: bold;
          color: #323232;
          background: #fff;
        }
      }
    }
    &-contributors {
      margin: 40px 0;
      a {
        position: relative;
      }
      img {
        height: 26px;
        height: 26px;
        border-radius: 50%;
        margin-left: 8px;
      }
      .contributors-hover {
        display: none;
        padding: 5px 10px;
        color: #fff;
        font-size: 12px;
        background-color: #000;
        border-radius: 5px;
        position: absolute;
        /* min-width:150px; */
        white-space: nowrap;
        top: -200%;
        transform: translateX(-55%);
      }
      a:hover {
        .contributors-hover {
          display: inline-block;
        }
      }
    }

    &-contributors-gap {
      padding-top: 20px;
      border-top: 1px solid #eeeaea;
    }

    &-faq {
      &-title {
        margin: 38px 0 20px;
        font-size: 24px;
        font-weight: bold;
      }

      &-item {
        margin: 0 8px 28px;
      }
      &-que {
        font-size: 18px;
        line-height: 30px;
        color: #323232;
        font-weight: 600;
      }
      &-aws {
        margin-top: 8px;
        color: #34495e;
        font-size: 14px;
        line-height: 26px;
      }
    }
  }
  &-title {
    width: 100%;
    height: $doc-title-height;
    z-index: 2;
    &-position {
      top: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 40px;
      // line-height: 56px;
      border-bottom: 1px solid #eee;
      background: #fff;
      visibility: visible;
      opacity: 1;
      // transition: opacity 0.8s linear, visibility 0.8s linear;
      transition: opacity 0.8s;
      &.fixed {
        width: calc(100% - 290px);
        position: fixed;
        padding: 24px 48px;
        .title {
          font-size: 24px;
          font-weight: bold;
        }
      }
      &.hidden {
        visibility: hidden;
        opacity: 0;
      }
      .title {
        font-size: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>
