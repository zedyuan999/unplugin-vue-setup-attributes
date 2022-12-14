import { compileScript, parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

export function transform(code: string, id: string) {
  let s: MagicString | undefined
  const str = () => s || (s = new MagicString(code))
  const { descriptor } = parse(code)
  if (!descriptor.script && descriptor.scriptSetup) {
    const result = compileScript(descriptor, { id })
    const { name, lang, inheritAttrs } = result.attrs
    if (name || inheritAttrs) {
      let content = ''
      const hasName = name ? `name: '${name}',` : ''
      const hasInheritAttrs = inheritAttrs ? `inheritAttrs: ${inheritAttrs === 'false' ? inheritAttrs : 'true'},` : ''
      if (name && inheritAttrs) {
        content = `  ${hasName}
  ${hasInheritAttrs}`
      }
      else if (name) {
        content = `  ${hasName}`
      }
      else {
        content = `  ${hasInheritAttrs}`
      }

      str().appendLeft(
        0,
        `<script ${lang ? `lang="${lang}"` : ''}>
import { defineComponent } from 'vue'
export default defineComponent({
${content}
})
</script>
\n`)
    }
    return {
      map: str().generateMap(),
      code: str().toString(),
    }
  }
  else {
    return null
  }
}
