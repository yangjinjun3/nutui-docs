# 主题定制

NutUI 默认提供一套 UI 主题，同时允许在一定程度上定制新的主题，以满足业务的多样化视觉需求。

## 官方主题 🌈

我们提供了一些官方主题，欢迎在项目中使用，如果下列主题还是不能满足您的需求，推荐您使用<a target="_blank" href="https://nutui.jd.com/theme-react/#/base" >在线主题预览生成器</a>

<br/>

<img src="https://img12.360buyimg.com/imagetools/jfs/t1/157759/16/13989/142151/6052efc7Ef8f4bff4/f3dd6422949ba4b7.jpg" width="700" alt="NutUI 主题定制">



## 样式变量

NutUI 的样式是基于 **[Sass](https://sass-lang.com/)** 开发的，定义了一套默认样式变量，定制主题就是编辑这个变量列表。

所有组件可用的基本样式变量请参考<a target="_blank" href="https://nutui.jd.com/theme/#/base" >在线主题预览生成器</a>,依次点击组件查看即可，可实时编辑预览下载。

<br/>

<img src="https://img14.360buyimg.com/imagetools/s1000x1000_jfs/t1/133323/6/25182/230015/62343b76E4fffb961/248a75ece7922294.png"  alt="NutUI 主题定制">


```scss
// 主色调
$primary-color: #fa2c19;
$primary-color-end: #fa6419;
...
```

> 在主题定制场景下，项目中引用组件时，需要引入 **scss** 文件，而不是 **css** 文件。

需要引入 **nutui.scss** 文件

```javascript
import "@nutui/nutui-react/dist/styles/themes/default.scss";
```

## 定制主题

### 第一步：新建自定义变量 SCSS 文件

在本地项目中新建一个 **SCSS** 文件 `custom_theme.scss`，自定义变量值。

``` scss
$primary-color: #478EF2;
$primary-color-end: #496AF2;
```

### 第二步：修改本地项目 webpack 或者 vite 的配置文件

修改 vite 或者 webpack 配置文件中 **sass-loader** 的配置。如下示例
#### vite 演示

``` javascript
// https://vitejs.dev/config/
export default defineConfig({
  //...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@nutui/nutui-react/dist/styles/variables.scss";@import "./your/custom_theme.scss";`
      }
    }
  }
})
```
