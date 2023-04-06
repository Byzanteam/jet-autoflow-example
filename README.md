# jet-autoflow-example

## Editor Config

我们提供了 .editorconfig 约束文件格式. 为了确保 editorconfig 的正常工作，你需要按照 [需插件支持](https://editorconfig.org/#download) 和 [无需插件支持](https://editorconfig.org/#pre-installed) 确定是否需要安装插件

我们同时提供了 `.vscode/settings.json` 约束文件格式，对于 vscode 用户来说，这会让你可以开箱即用。对于非 vscode 用户，`.editorconfig` 也能帮你约束，但是可能需要你安装插件

# Vue 3 + Typescript + Vite

- [Vue 3](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev)

## Recommended IDE

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Quick start

```sh
pnpm install

# 本地如需覆盖 `.env` 文件，需新建 `.env.local` 文件
# 环境变量设置参考 https://vitejs.dev/guide/env-and-mode.html#env-files
pnpm dev

# 打包生产环境代码
pnpm build

# 生产环境预览
pnpm build
pnpm preview
```

## Router

routes 通过 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 动态生成

### 常见问题

- Q: 自动生成路由的规则是什么样子的？支持 vue-router 的哪些能力?
  - A: 我们使用的是[nuxt 风格](https://nuxtjs.org/docs/features/file-system-routing)的生成方式
- Q: 如果要做路由权限应该怎么做?
  - A: 见附录的使用方式

### 附录

- 在需要权限控制的页面中加入自定义的 Route Data

```
<route>
{
  meta: {
    roles: ['admin', 'editor']
  }
}
</route>
```

tips：若路由提供了 roles 则代表对指定的角色有权限，否则对所有的角色都有权限

- 将路由分为 constantRoutes 和 asyncRoutes

```ts
import routes from '~pages'

const { constantRoutes, asyncRoutes } = filterRoutes(routes)
createRouter({ routes: constantRoutes })
```

- 管理用户的状态，包括 token、roles 等信息

- 管理路由的状态，包括 routes、currentRolesAsyncRoutes

```ts
function generateRoutes(roles) {
  currentRolesAsyncRoutes = filterAsyncRoutes(asyncRoutes, roles)
  routes = constantRoutes.concat(currentRolesAsyncRoutes)
}
```

- 角色每次变更后更新路由

```ts
watch(
  userInfo.roles,
  roles => {
    resetRoutes()
    if (roles.length) {
      generateRoutes(roles)
      addRoutes(currentRolesAsyncRoutes)
    }
  },
  { immediate: true },
)
```

tips：token 和 roles 都必须使用本地存储，这样才能保证每次刷新都去更新路由

## Css

### Tailwindcss

[配置颜色主题](https://tailwindcss.com/docs/customizing-colors)，间距使用默认定义的，未定义的使用任意值(以[宽度的任意值](https://tailwindcss.com/docs/width#arbitrary-values)为例)
