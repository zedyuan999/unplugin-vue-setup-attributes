# unplugin-vue-setup-attributes


[English](./README.md) | 简体中文

扩展vue script setup 语法，使它支持name和inheritAttrs属性

## 特性

- ✨ 扩展vue script setup 语法，使它支持name和inheritAttrs属性；
- 💚 开箱即用，支持 Vue 2.7 和 Vue 3；
- ⚡️ 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等, 由 [unplugin](https://github.com/unjs/unplugin) 提供支持。

## 安装
npm

```bash
npm i unplugin-vue-setup-attributes -D
```

## 使用

### 配置

在构建工具的配置文件中配置，例如**vite.config.ts**,**vue.config.js** and **webpack.config.js**

vite
```ts
// vite.config.ts
import { Plugin, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupAttributes from 'unplugin-vue-setup-attributes'

export default defineConfig({
  plugins: [vue(), vueSetupAttributes()],
})
```

Webpack
```ts
// vue.config.js
const vueSetupAttributes = require('./script/dist/webpack').default

module.exports = {
  configureWebpack: {
    plugins: [
      vueSetupAttributes()
    ]
  },
}
```

```ts
// webpack.config.js
const vueSetupAttributes = require('./script/dist/webpack').default

module.exports = {
  plugins: [
    vueSetupAttributes()
  ]
}
```
单文件组件
```html
<script setup lang="ts" name="Home" inheritAttrs="false">
  import { ref } from 'vue'
  const foo = ref("foo")
</script>
```

<details>
<summary>输出</summary>

```html
<script lang="ts">
export default {
  name: 'Home',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
  import { ref } from 'vue'
  const foo = ref("foo")
</script>
```

</details>

## License

[MIT](./LICENSE) License © 2022 [zedyuan999](https://github.com/zedyuan999)