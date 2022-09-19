# unplugin-vue-setup-attributes


English | [简体中文](./README.zh-CN.md)

Extend vue script setup syntax,make it support the name and inheritAttrs attribute.

## Features

- ✨ Extend vue script setup syntax,make it support the name and inheritAttrs attribute.
- 💚 Supports both Vue 2.7 and Vue 3 out-of-the-box.
- ⚡️ Supports Vite, Webpack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).

## Installation
npm

```bash
npm i unplugin-vue-setup-attributes -D
```

## Usage

### Config

Config plugin in build tool configuration file,such as **vite.config.ts**,**vue.config.js** and **webpack.config.js**

**Vite**
```ts
// vite.config.ts
import { Plugin, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupAttributes from 'unplugin-vue-setup-attributes'

export default defineConfig({
  plugins: [vue(), vueSetupAttributes()],
})
```

**Webpack**
```ts
// vue.config.js

module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-setup-attributes')()
    ]
  },
}
```

```ts
// webpack.config.js

module.exports = {
  plugins: [
    require('unplugin-vue-setup-attributes')()
  ]
}
```

### SFC

```html
<script setup lang="ts" name="Home" inheritAttrs="false">
  import { ref } from 'vue'
  const foo = ref("foo")
</script>
```

<details>
<summary>Output</summary>

```html
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
  import { ref } from 'vue'
  const foo = ref("foo")
</script>
```

</details>

## License

[MIT](./LICENSE) License © 2022 [zedyuan999](https://github.com/zedyuan999)