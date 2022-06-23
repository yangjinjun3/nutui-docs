# 开发工具支持

## 介绍

为了给开发者提供更好的开发体验，组件库提供了针对 `vscode` 和 `webstorm` 的组件高亮能力，通过插件可以获得 `代码自动补全`，`快速查看文档`，`文档props说明`。官方还特意为 `vscode` 提供了辅助插件，开发者可以下载安装使用。


## VSCode

### 快速查看文档，代码自动补全

* 在 `vscode` 插件市场或者在编辑器中搜索 `nutui-vscode-extension`，然后安装，当我们在使用 `NutUI` 组件库开发项目时，鼠标悬停在组件上方时，可以通过链接直接前往当前组件所在的文档地址，这样可以非常快捷的进行开发。
<br />
<br />
<img width="80%" src="https://img14.360buyimg.com/imagetools/jfs/t1/87884/24/27317/139487/6268fe75E5919ee92/3ac96e0854f61936.png" />
<br />
<br />
<img width="80%" src="https://img10.360buyimg.com/imagetools/jfs/t1/120866/25/26832/145795/6268fc36E9543d03b/a807a3efc04d9da8.png" />
<br />
<br />


* 当我们在模版中写以 `nut` 或者 `nut-` 开头时，会把当前组件库中包含的所有组件 `list` 列出，供开发者快速选择。选择其中某个组件之后按回车键，可以自动补全当前组件，并带出组件的其中一个 `props`,开发者可快速对其自定义。
<br />
<br />
<img width="80%" src="https://img14.360buyimg.com/imagetools/jfs/t1/122412/14/28281/1092569/6268ffdcE3bbe34b8/ec289bd5a5e63179.gif" />
<br />
<br />


### Vetur

安装 `vetur` 插件，我们还可以提供组件的 `props` 文档说明。开发者甚至可以不用去官网查看了。

> 注意：这里一定要先保证已经安装了 `vetur` 插件。另外，还要保证 `NutUI` 版本需要在 `v3.1.19` 及以上

<img width="80%" src="https://img14.360buyimg.com/imagetools/jfs/t1/118540/18/21049/172147/6268fc36E2c78bca3/e0d5731a5a425c71.png" />
<br />
<br />

## WebStorm

此功能依赖版本 `v3.1.22` 及以上，为开发者提供了组件快速查看其属性以及默认值、说明的功能，来方便开发者进行开发使用。
<br />
<br />
<img width="80%" src="https://img13.360buyimg.com/imagetools/jfs/t1/53098/8/20565/137323/62b47408E6c82eb60/baf676ab30cd1e9a.png" />
<br />
<br />
<img width="80%" src="https://img10.360buyimg.com/imagetools/jfs/t1/185923/22/25524/244204/62b47408E4e77f756/1de9f0bbd0a418e9.png" />