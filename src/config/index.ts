// 抽象配置中心
const site_config = {
  versions: [
    {
      name: '1.x',
      link: '/1x/'
    },
    {
      name: '2.x',
      link: '/2x/'
    },
    {
      name: '3.x',
      link: '/'
    },
    {
      name: 'nutui-jdl',
      link: '/jdl/'
    },
    {
      name: 'nutui-react',
      link: 'https://nutui.jd.com/react'
    }
    // {
    //   name: 'nutui-cat',
    //   link: 'https://github.com/jdf2e/nutui-cat'
    // },
    // {
    //   name: 'nutui-bingo',
    //   link: 'https://github.com/jdf2e/nutui-bingo'
    // }
  ],
  header: [
    {
      name: 'intro,theme,start',
      cName: '指南',
      path: '#/intro'
    },
    {
      name: 'component',
      cName: '组件',
      path: '#/button'
    },
    {
      name: 'example',
      cName: '示例',
      path: 'demo.html'
    },
    {
      name: 'case',
      cName: '案例',
      path: '#/case'
    },
    {
      name: 'resource',
      cName: '资源',
      path: '#/resource'
    },
    {
      name: 'notice',
      cName: '通知',
      path: '#/notice'
    },
    {
      name: 'joinus',
      cName: '加入我们',
      path: '#/joinus'
    }
  ]
};
import vueConfig from '../docs_vue/config.json';
import reactConfig from '../docs_react/config.json';

import homefeatures1 from '@/assets/images/img-home-features1.png';
import homefeatures2 from '@/assets/images/img-home-features2.png';
import homefeatures3 from '@/assets/images/img-home-features3.png';
import homefeatures4 from '@/assets/images/img-home-features4.png';
import homefeatures5 from '@/assets/images/img-home-features5.png';

let config: any = {};
let language: string = '';
if ((import.meta as any).env.BASE_URL.includes('react')) {
  config = {
    ...reactConfig,
    homePage: {
      gitstar: 'https://ghbtns.com/github-btn.html?user=jdf2e&repo=nutui-react&type=star&count=true&size=large',
      platform: [],
      // 是否展示taro楼层
      taroShow: false
    }
  };
  language = 'react';
} else {
  config = {
    ...vueConfig,
    homePage: {
      gitstar: 'https://ghbtns.com/github-btn.html?user=jdf2e&repo=nutui&type=star&count=true&size=large',
      // 平台资源楼层
      platform: [
        {
          title: '京东风格',
          desc: '遵循京东 App 10.0 设计规范',
          url: homefeatures1
        },
        {
          title: '前沿技术',
          desc: 'Vue3 Vite 2.x TypeScript',
          url: homefeatures3
        },
        {
          title: '适配多端',
          desc: '基于 Taro 轻松开发多端小程序',
          url: homefeatures5
        },
        {
          title: '组件丰富',
          desc: '70+ 组件，覆盖多数业务场景',
          url: homefeatures2
        }
        // {
        //   title: '贴心通道',
        //   desc: '社区维护 高效服务<br />技术支持 经验沉淀',
        //   url: homefeatures4,
        // },
      ],
      // 是否展示taro楼层
      taroShow: true
    }
  };
  language = 'vue';
}
let { nav, docs, version, demoUrl, homePage } = config;
const { versions, header } = site_config;
console.log(nav);
export { nav, versions, header, docs, version, demoUrl, language, homePage };
