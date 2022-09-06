import { createUnplugin } from 'unplugin'
import { transform } from './core'

export const unplugin = createUnplugin(() => {
  return {
    name: 'unplugin-vue-setup-attributes',
    enforce: 'pre',
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
