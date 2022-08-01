# 国际化

NutUI 3.0 以上版本支持多语言。组件默认使用中文。具体使用方法如下：

## 使用方法

### 多语言切换

```javascript
// 多语言版本
import { ConfigProvider } from "@nutui/nutui-react";
import en from "@nutui/nutui-react/dist/locales/en-US";

ReactDOM.render(
  <ConfigProvider locale={en}>
    <App />
  </ConfigProvider>,
  document.querySelector("#root"),
);
```

## 目前支持的语言:

| 语言         | 文件名 | 版本        |
|--------------|--------|-----------|
| 英语         | en-US  | `v1.1.4` |
| 印度尼西亚语 | id-ID  | `v1.1.5` |
| 泰语         | th-TH  | 等待 PR     |
| 简体中文     | zh-CN  | `v1.1.4`  |
| 繁體中文     | zh-TW  | `v1.1.4` |

> 在 [这里](https://github.com/jdf2e/nutui-react/tree/main/src/locales) 查看所有的语言包源文件。

## 常见问题

### 找不到所需的语言包？

如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包。改动内容可以参考 [语言包](https://github.com/jdf2e/nutui-react/tree/main/src/locales) 的 PR

