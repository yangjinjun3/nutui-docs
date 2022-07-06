<template>
  <div class="doc-nav" :class="{ fixed: fixed }">
    <ol v-if="isGuideNav">
      <!-- <li>
        {{ docs.name }}
      </li> -->
      <ul>
        <li
          :class="{ active: isActive(_package.name) }"
          v-for="_package in docs.packages"
          :key="_package"
          v-show="_package.show"
        >
          <router-link v-if="!_package.isLink" :to="_package.name.toLowerCase()">{{
            isZh ? _package.cName : _package.eName
          }}</router-link>
          <a v-else :href="_package.name" target="_blank">{{ isZh ? _package.cName : _package.eName }}</a>
        </li>
      </ul>
    </ol>
    <template v-else>
      <ol v-for="_nav in nav" :key="_nav">
        <li>{{ isZh ? _nav.name : _nav.enName }}</li>
        <ul>
          <template
            :class="{ active: isActive(_package.name) }"
            v-for="_package in reorder(_nav.packages)"
            :key="_package"
          >
            <li v-if="_package.show">
              <router-link :to="_package.name.toLowerCase()" :class="{ active: isActive(_package.name) }">
                {{ _package.name }}&nbsp;&nbsp;<b v-if="isZh">{{ _package.cName }}</b>
              </router-link>
            </li>
          </template>
        </ul>
      </ol>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, toRefs, ref } from 'vue';
import { onBeforeRouteUpdate, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { RefData } from '@/assets/util/ref';
import { useLocale } from '@/assets/util/locale';
import { nav, docs } from '@/config/index';
export default defineComponent({
  name: 'doc-nav',
  setup(props: any) {
    const route = useRoute();
    const router = useRouter();
    const { isZh } = useLocale();
    const state = reactive({
      fixed: false,
      isGuideNav: false
    });

    const isActive = computed(() => {
      return function (name: string) {
        const currentValue = RefData.getInstance().currentRoute.value;
        let value = currentValue.indexOf('-taro') > -1 ? currentValue.split('-taro')[0] : currentValue;
        return value == name.toLowerCase();
      };
    });

    const reorder = (packages: any) => {
      return packages.sort(function (x: any, y: any) {
        return x['name'].localeCompare(y['name']);
      });
    };
    onMounted(() => {
      if (route.name) getIsGuaid(route.path);

      document.addEventListener('scroll', scrollNav);
    });
    const scrollNav = () => {
      let top = document.documentElement.scrollTop;
      // console.log('a', top)
      if (top > 64) {
        state.fixed = true;
      } else {
        state.fixed = false;
      }
    };

    const getIsGuaid = (name: any) => {
      state.isGuideNav = name.indexOf('guide') > -1 ? true : false;
    };

    onBeforeRouteUpdate((to: any) => {
      let name: any = '';
      console.log('当前路由', to);
      if (to) {
        name = to.path;
      } else {
        name = route.path;
      }
      getIsGuaid(name);
    });
    return {
      ...toRefs(state),
      isActive,
      nav: reactive(nav),
      docs: reactive(docs),
      currentRoute: RefData.getInstance().currentRoute,
      reorder,
      isZh
    };
  }
});
</script>

<style lang="scss">
.doc {
  &-nav {
    position: absolute;
    top: $doc-header-height;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: $white;
    width: 290px;
    height: 100vh;
    border-right: 1px solid #eee;
    overflow: auto;
    padding-left: 35px;
    padding-top: 35px;
    &.fixed {
      position: fixed;
      top: 0;
      padding-top: 15px;
    }
    ol {
      &.introduce {
        padding-left: 5px;
        li {
          cursor: pointer;
          &:hover {
            color: $doc-default-color;
          }
        }
      }
      li {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: $doc-default-nav-color;
        font-weight: bold;
        position: relative;

        &.active {
          &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 50%;
            width: 22px;
            margin-top: -5px;
            height: 10px;
            transform: rotate(90deg);
            background: $doc-smile-curve;
            background-size: 100% 100%;
          }
        }
      }
      > ul {
        li {
          padding-left: 29px;
          cursor: pointer;

          &:hover {
            a {
              color: $doc-default-color;
            }
          }
          a {
            &.router-link-active,
            &.active {
              color: $doc-default-color !important;
            }

            &:link,
            &:visited {
              color: $title-color;
            }

            &:hover {
              color: $doc-default-color;
              &:visited {
                color: $doc-default-color;
              }
            }

            height: 100%;
            b {
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
