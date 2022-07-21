# Customize Theme

NutUI support multiple UI themes by default. And in order to meet diffrent visual needs, you can also custom your theme all the same.

## Official Theme 🌈

NutUI support some official themes, welcome to use. if they are not enough, recommended to use<a target="_blank" href="https://nutui.jd.com/theme-react/#/base" >Online Theme Preview Generator</a>

<br/>

<img src="https://img12.360buyimg.com/imagetools/jfs/t1/157759/16/13989/142151/6052efc7Ef8f4bff4/f3dd6422949ba4b7.jpg" width="700" alt="NutUI 主题定制">



## Style Variables

NutUI style bases on **[Sass](https://sass-lang.com/)**, and contains some default style variables. Customimg theme is also change these variables([variables.scss](https://github.com/jdf2e/nutui-react/blob/main/src/styles/variables.scss))。

All usable style variables refer to <a target="_blank" href="https://nutui.jd.com/theme/#/base" >Online Theme Preview Generator</a>. You can click the component to preview or real-time modify, preview and download.

<br/>

<img src="https://img14.360buyimg.com/imagetools/s1000x1000_jfs/t1/133323/6/25182/230015/62343b76E4fffb961/248a75ece7922294.png"  alt="NutUI 主题定制">


```scss
// 主色调
$primary-color: #fa2c19;
$primary-color-end: #fa6419;
...
```

> In custom theme scene, you need import **scss** file rather than **css** file

import **nutui.scss**

```javascript
import "@nutui/nutui-react/dist/styles/themes/default.scss";
```

## Custom Theme

### First: create custom variables custom_theme.scss

Create **SCSS** file `custom_theme.scss` in local to custom your variables. Variables can real-time modify, preview and download through <a target="_blank" href="https://nutui.jd.com/theme-react/#/base">Online Theme Preview Generator</a>

``` scss
$primary-color: #478EF2;
$primary-color-end: #496AF2;
```

### Next：update your webpack or vite configure file

Configure **sass-loader**. For example:

#### vite

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
