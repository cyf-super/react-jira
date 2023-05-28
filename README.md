# 模拟 jira 网站的 react 项目

一个模拟 jira 网站的 react 项目，涉及到很多 react 的知识点，可以作为入门级别的项目

- 自定义 hook
- 组件设计
- antd 应用
- ...

## 技术栈

- react-query：路由
- react-router：数据获取和缓存等
- @welldone-software/why-did-you-render： 帮助调试和优化 react 代码性能
- styled：css 组件

数据共享使用：React.context、prpos、组合组件

封装了一众 hooks：

- useAsync：处理异步数据
- useAuth：获取用户信息
- useQueryParams：处理 query 参数
- useConfig：处理乐观更新
- ...

## 使用

```
// 安装依赖
yarn install

// run
yarn dev
```
