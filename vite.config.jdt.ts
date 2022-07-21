import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import path from 'path';
import config from './src/docs_vue/config.json';
import { compressText } from './src/components/demo-block/basedUtil';
const hljs = require('highlight.js'); // https://highlightjs.org/
const refRandom = Math.random().toString(36).slice(-8);
const resolve = path.resolve;
// https://vitejs.dev/config/
export default defineConfig({
  base: '/jdt/',
  server: {
    port: 2021,
    host: '0.0.0.0',
    open: '/jdt/index.jdt.html',
    proxy: {
      '/devServer': {
        target: 'https://nutui.jd.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devServer/, '')
      },
      '/devTheme': {
        target: 'https://nutui.jd.com/theme/source',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devTheme/, '')
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `
        $doc-default-color: #2c68ff !default;
        $doc-smile-curve: url("https://img14.360buyimg.com/imagetools/jfs/t1/217538/34/19232/3215/62872c85Ecce2deda/6549417387fc413f.png") !default;
        $doc-footer-theme-icon: url('@/assets/images/icon-color-blue.png') no-repeat center/100% !default;
        @import "@/assets/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'ie > 11', 'iOS >= 10', 'Android >= 5']
        })
      ]
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value;
            } catch (__) {}
          }

          return ''; // 使用额外的默认转义
        }
      },
      markdownItSetup(md) {
        md.use(require('markdown-it-container'), 'demo', {
          validate: function (params) {
            return params.trim().match(/^demo\s*(.*)$/);
          },

          render: function (tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
              // opening tag
              const contentHtml = compressText(tokens[idx + 1].content);
              return `<demo-block data-type="vue" data-value="${contentHtml}">` + md.utils.escapeHtml(m[1]) + '\n';
            } else {
              // closing tag
              return '</demo-block>\n';
            }
          }
        });
      }
    })
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // })
  ],
  build: {
    target: 'es2015',
    outDir: './dist/jdt/',
    assetsDir: `${config.version}-${refRandom}`,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        vue: resolve(__dirname, 'index.jdt.html')
      },
      output: {
        entryFileNames: `${config.version}-${refRandom}/[name].js`,
        chunkFileNames: `${config.version}-${refRandom}/[name].js`,
        assetFileNames: `${config.version}-${refRandom}/[name].[ext]`
      }
    }
  }
});
