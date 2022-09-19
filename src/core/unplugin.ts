import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { transform } from './transform'

export default createUnplugin(() => {
  const filter = createFilter(
    [/\.vue$/, /\.vue\?vue/],
    [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
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
