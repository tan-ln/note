# NextJS

Next.js 是一个灵活的 React 框架，它提供了构建块来创建快速的 Web 应用程序

- React.JS 是一个用于构建交互式用户界面的 JavaScript 库，主要是在视图层面，提供函数来构建 UI
- 但是在其他方面没有而是开放了，导致第三方工具库和解决方案的蓬勃发展，如 路由、状态管理、样式管理

Next.js 提供了处理 React 所需的工具和配置，我们可以使用 React.js 来构建 UI，然后逐步采用 Next.js 功能来解决常见的应用程序需求，例如路由、数据获取

## 安装
```bash
npx create-next-app@latest
```
<!-- package.json -->
```json
{
  "script": {
    "dev": "next dev", // 开发环境
    "build": "next build", // 构建生产环境
    "start": "next start", // 开启生产环境的运行服务，
    "export": "next export", // 生成纯静态
  }
}
```
与 react.js 的不同之处在于，react.js 构建完成之后生成了 HTML、CSS、JS 等静态文件，将这些静态文件放在 nginx 、tomcat 或一些托管环境上就行
next.js 提供的是全栈方案
也可以生成全静态 `export`


`yarn dev`: 在 3000 端口查看开发环境
`yarn build`: 生成 生产环境的文件 （.next 目录）
`yarn start`: 在本地启动服务运行生产环境

next.js 会 build 出一个静态的 html，和一部分动态的 js，渲染时会先渲染静态的页面，再加载动态 js 后再次渲染一次 (性能优化相关)

next.js 在 build 之后，不能直接托管，而是需要在一个生产环境的服务器上 start 把 next 跑起来，由 next 生产环境的运行时来动态响应

或者生成纯静态
`yarn export` 生成 out 目录，这个目录可以直接放在 nginx，访问时直接返回 index.html 就行

