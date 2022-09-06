import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { PluginOptions } from './types'
import { transform } from './core'

export const unplugin = createUnplugin<PluginOptions>((options = {}) => {
  const filter = createFilter(
    options.include || (options.reactivityTransform ? [/\.vue$/, /\.vue\?vue/, /\.[jt]sx?$/] : [/\.vue$/, /\.vue\?vue/]),
    options.exclude || [/node_modules/, /\.git/, /\.nuxt/],
  )

  return {
    name: 'unplugin-vue-setup-attributes',
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    async transform(code, id) {
      try {
        return await transform(code, id)
      }
      catch (e: any) {
        this.error(e)
      }
    },
  }
})

export default unplugin
