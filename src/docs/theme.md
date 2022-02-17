# 主题定制

NutUI 默认提供一套 UI 主题，同时允许在一定程度上定制新的主题，以满足业务的多样化视觉需求。
> 🌈 &nbsp;在线主题预览生成器 <a target="_blank" href="https://nutui.jd.com/theme/#/base" >https://nutui.jd.com/theme/#/base</a>
<br/>

<img src="https://img12.360buyimg.com/imagetools/jfs/t1/157759/16/13989/142151/6052efc7Ef8f4bff4/f3dd6422949ba4b7.jpg" width="700" alt="NutUI 主题定制">



## 样式变量

NutUI 的样式是基于 **[Sass](https://sass-lang.com/)** 开发的，定义了一套默认样式变量，定制主题就是编辑这个变量列表。

以下是一些与颜色相关基本样式变量，所有可用的变量请参考[配置文件 variables.scss](https://github.com/jdf2e/nutui/blob/next/src/packages/styles/variables.scss)。 


> 我们推荐您使用 🌈 &nbsp;在线主题预览生成器 <a target="_blank" href="https://nutui.jd.com/theme/#/base" >https://nutui.jd.com/theme/#/base</a>

```scss
// 主色调
$primary-color: #fa2c19;
$primary-color-end: #fa6419;
...
```

> 在主题定制场景下，项目中引用组件时，需要引入 **scss** 文件，而不是 **css** 文件。

需要引入 **nutui.scss** 文件

```javascript
import NutUI from '@nutui/nutui';
import "@nutui/nutui/dist/styles/themes/default.scss";
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
        additionalData: `@import "./assets/custom_theme.scss";`
      }
    }
  }
})
```

#### vue/cli 2版本

``` javascript
{
    test: /\.(sa|sc)ss$/,
    use: [
        {
            loader: 'sass-loader',
            options: {
                data: `@import "./assets/custom_theme.scss";`,
            }
        }
    ]
}
```

#### vue/cli 3 以上版本修改 **vue.config.js** 进行配置

``` javascript
module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            scss: {
                // @/ 是 src/ 的别名
                // 注意：在 sass-loader v7 中，这个选项名是 "data"
                prependData: `@import "@/assets/custom_theme.scss";`,
            }
        },
    }
}
```

> @nutui/nutui 多种模式（vite 、vue/cli、cdn、ts）使用示例 [Demo](https://github.com/jdf2e/nutui-demo)