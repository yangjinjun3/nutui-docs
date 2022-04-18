# 国际化

NutUI 3.0 以上版本支持多语言。组件默认使用中文。具体使用方法如下：

## 使用方法

### 多语言切换

```javascript
import Vue from 'vue';
import { Locale } from '@nutui/nutui';
import enUS from '@nutui/nutui/dist/locale/lang/en-US';
Locale.use('en-US', enUS);
```

## 目前支持的语言:

| 语言         | 文件名 | 版本      |
|--------------|--------|-----------|
| 英语         | en-US  | `v3.1.19` |
| 印度尼西亚语 | id-ID  | 等待 PR   |
| 泰语         | th-TH  | 等待 PR   |
| 简体中文     | zh-CN  | `v3.1.19` |
| 繁體中文     | zh-TW  | `v3.1.19` |

> 在 [这里](https://github.com/jdf2e/nutui/tree/next/src/vant/src/packages/locale/lang) 查看所有的语言包源文件。

## 常见问题

### 找不到所需的语言包？

如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包。改动内容可以参考增加 [中文繁体](https://github.com/jdf2e/nutui/commit/d6275bf87387860e0757629f3553320359ec7434) 语言包 的 PR

### 业务代码如何实现国际化？

可以使用 [vue-i18n](https://github.com/kazupon/vue-i18n) 来实现。