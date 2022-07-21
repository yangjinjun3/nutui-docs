# Internationalization

NutUI-React support multiple languages. NutUI uses Chinese as the default language. Use as follows:

## Usage

### Switch languages

```javascript
import { ConfigProvider } from "@nutui/nutui-react";
import en from "@nutui/nutui-react/dist/locales/en-US";

ReactDOM.render(
  <ConfigProvider locale={en}>
    <App />
  </ConfigProvider>,
  document.querySelector("#root"),
);
```

## Current supported languages:

| Language         | Filename | Version   |
|--------------|--------|-----------|
| English         | en-US  | `v1.1.4`   |
| Indonesian | id-ID  | `v1.1.5` |
| Thai         | th-TH  | Need PR   |
| Chinese     | zh-CN  | `v1.1.4` |
| Traditional Chinese     | zh-TW  | `v1.1.4` |

> View all language configs [Here](https://github.com/jdf2e/nutui-react/tree/main/src/locales).

## Common Questions

### Missing language pack?

Welcome to commit PR If you need new language pack. Changes refer to [language pack](https://github.com/jdf2e/nutui-react/tree/main/src/locales).

