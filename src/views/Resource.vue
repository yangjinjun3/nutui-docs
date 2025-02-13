<template>
  <doc-header></doc-header>
  <div class="resource-main">
    <div class="resource-main-content">
      <h3 class="sub-title">资源</h3>
      <p class="sub-desc"
        >想要了解 NutUI 设计体系背后的故事？如何才能更好的应用？你可以查阅下述我们为你精挑细选的文章。也欢迎关注 NutUI
        官方专栏，这里常有关于 NutUI 设计体系下相关话题内容的最新分享和讨论。</p
      >
    </div>
  </div>
  <!-- 设计资源 -->
  <div class="resource-content">
    <div class="resource-block">
      <h4 class="sub-title">设计资源</h4>
      <!-- <h4 class="sub-title">学习资料</h4> -->
      <p class="sub-desc"
        >NutUI 3x 基于 JD APP 10.0 视觉规范实现的组件库，在这里可以下载 sketch 设计资源。
        <a class="download" download href="https://storage.360buyimg.com/nutui-static/NutUI3xStyleGuide.sketch"
          >点击下载
        </a>
      </p>
      <p class="sub-desc"
        >NutUI-JDT 京东科技体系移动端设计规范，这里可以下载 sketch 设计资源。
        <a class="download" download href="https://storage.360buyimg.com/nutui-static/DTDMobileUIkits.sketch"
          >点击下载
        </a>
      </p>
      <!-- <img
        src="https://img11.360buyimg.com/imagetools/jfs/t1/206767/18/7920/405226/6181e655E6b5be4de/47a13df50b92106b.jpg"
      /> -->
    </div>
    <div class="resource-block">
      <div class="no-data" v-if="articleList.length === 0">
        <img class="nodata-img-joy" src="@/assets/images/img-joy.png" />
        <p class="nodata-desc">敬请期待</p>
      </div>
      <div class="tab-box" v-else>
        <h4 class="sub-title">视频</h4>
        <div class="tab-bd" >
          <div class="design-item" v-for="(vItem, i) in videoList" v-show="activeIndex === 0" :key="i" @click="toVideoLink(vItem.link)">
            <img class="img-design" :src="vItem.cover_image" />
            <p class="design-title" v-hover>{{ vItem.title }}</p>
            <div class="play"><img src="@/assets/images/play-start.png" alt="" /></div>
          </div>
        </div>
        <h4 class="sub-title">文章</h4>
        <template v-for="pItem in articleList" v-show="activeIndex === 0" :key="pItem.category">
          <h3>{{ pItem.title }}</h3>
          <div class="tab-bd">
            <div class="design-item" v-for="item in pItem.list" :key="item.id" @click="toLink(item.id)">
              <img class="img-design" :src="item.cover_image" />
              <p class="design-title" v-hover>{{ item.title }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 社区文章 -->
    <div class="resource-block">
      <h4 class="sub-title">社区文章</h4>
      <p class="sub-desc"></p>
      <ul class="article-box">
        <li class="article-item" v-for="item in communityArticleList" :key="item.id">
          <a class="article-link" target="_blank" :href="item.link"> {{ item.title }} - {{ item.user_name }} </a>
        </li>
      </ul>
    </div>
  </div>
  <doc-footer></doc-footer>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import HeaderJDT from '@/docs_jdt/Header.vue';
import Footer from '@/components/Footer.vue';
import { RefData } from '@/assets/util/ref';
import { ApiService } from '@/service/ApiService';
import { isJDT } from '@/assets/util';
export default defineComponent({
  name: 'doc',
  components: {
    [Header.name]: isJDT() ? HeaderJDT : Header,
    [Footer.name]: Footer
  },
  setup() {
    const articleList: any[] = [];
    const communityArticleList: any[] = [];
    const videoList: any = [];
    const data = reactive({
      articleList,
      communityArticleList,
      videoList,
      tabData: [
        {
          title: '文章'
        }
        // {
        //   title: '性能体验'
        // },
        // {
        //   title: '性能体验'
        // }
      ],
      activeIndex: 0,
      showNutuiCat: false
    });
    const watchDemoUrl = (router: RouteLocationNormalized) => {
      RefData.getInstance().currentRoute.value = router.name as string;
    };
    onMounted(() => {
      // 路由
      const route = useRoute();
      watchDemoUrl(route);

      // 文章列表接口
      const apiService = new ApiService();
      apiService.getArticle().then((res) => {
        if (res?.state == 0) {
          const categoryMap: {
            [props: string]: string;
          } = {
            1: '项目实践',
            2: '技术揭秘',
            3: '成长历程'
          };
          (res.value.data.arrays as any[]).forEach((element) => {
            if (element.type == 1) {
              let category = element.category;
              let index = data.articleList.findIndex((item) => item.category == category);
              if (index != -1) {
                data.articleList[index].list.push(element);
              } else {
                data.articleList.push({
                  category: category,
                  title: categoryMap[category],
                  list: [element]
                });
              }
            } else {
              data.communityArticleList.push(element);
            }
          });
          // 进行排序
          let order = [3, 2, 1];
          data.articleList.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
        }
      });

      // 视频列表接口1
      apiService.getVideo().then((res) => {
        if (res?.state == 0) {
          data.videoList = res.value.data.arrays;
        }
      });
    });
    onBeforeRouteUpdate((to) => {
      watchDemoUrl(to);
    });
    const clickTab = (index: number) => {
      data.activeIndex = index;
    };
    const toLink = (id: number) => {
      window.open('//jelly.jd.com/article/' + id);
    };
    const toVideoLink = (url: string) => {
      window.open(url);
    };
    return {
      ...toRefs(data),
      clickTab,
      toLink,
      toVideoLink
    };
  }
});
</script>

<style lang="scss" scoped>
$mainRed: rgba($doc-default-color, 0.8);
.resource {
  &-main {
    background-color: #1d1d1d;
    &-content {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 48px;
      padding-bottom: 53px;
      background: url('@/assets/images/bg-article.png') no-repeat;
      background-size: 307px 200px;
      background-position: right 280px top 0;
      .sub-title {
        margin-left: 8px;
        margin-bottom: 40px;
        line-height: 36px;
        font-size: 30px;
        color: $white;
      }
      .sub-desc {
        line-height: 22px;
        font-size: 16px;
        color: $white;
      }
    }
  }
  &-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
  }
  &-block {
    margin-bottom: 50px;
    text-align: left;
    .download {
      color: #38f;
    }
    > img {
      width: 100%;
      box-shadow: 0px 1px 7px 0px rgba(237, 238, 241, 1);
    }
    .sub-title {
      margin-bottom: 15px;
      line-height: 42px;
      font-size: 30px;
      color: #1a1a1a;
    }
    .sub-desc {
      margin-bottom: 40px;
      line-height: 22px;
      font-size: 16px;
      color: #959fb1;
    }
    .sub-red {
      color: $doc-default-color;
    }
  }
}
.no-data {
  text-align: center;
  .nodata-img-joy {
    width: 269px;
    height: 153px;
    margin-bottom: 30px;
  }
  .nodata-desc {
    font-size: 16px;
    color: #959fb1;
  }
}
.tab {
  &-box {
    .sub-title {
      margin-bottom: 20px;
    }
    > h3 {
      margin-bottom: 18px;
    }
  }
  &-hd {
    display: flex;
    margin-bottom: 30px;
  }
  &-bd {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  &-hd-item {
    margin-right: 40px;
    line-height: 25px;
    font-size: 18px;
    color: #808080;
    cursor: pointer;
    &:first-child {
      color: #1a1a1a;
    }
    &.active {
      color: #e32c36;
    }
  }
}
.design {
  &-item {
    position: relative;
    width: 280px;
    margin-right: 26px;
    margin-bottom: 45px;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .img-design {
      width: 280px;
      height: 170px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
    .play {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
  &-title {
    width: 280px;
    height: 44px;
    line-height: 22px;
    font-size: 16px;
    color: #1d1d21;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
}
.article {
  &-item {
    position: relative;
    padding-left: 34px;
    margin-bottom: 20px;
    color: $mainRed;
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -8px;
      width: 12px;
      height: 12px;
      border: 2px solid $doc-default-color;
      border-radius: 50%;
    }
  }
  &-link {
    line-height: 22px;
    font-size: 14px;
    color: $mainRed;
    cursor: pointer;
  }
}
</style>
