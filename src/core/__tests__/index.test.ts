import { promises as fs } from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'
import plugin from '../..'
import { transform } from '..'

describe('plugin test.', () => {
  test('make sure name.', async () => {
    const { name } = await plugin.vite()
    expect(name).toEqual('unplugin-vue-setup-attributes')
  })

  test('not a vue file.', async () => {
    const ret = await transform('code', 'index.html')
    expect(ret).toBe(null)
  })

  test('correct conversion name.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-name.vue'),
    )
    const injectedContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-name-injected.vue'),
    )
    const ret = transform(content.toString(), 'test-name.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })

  test('correct conversion attributes.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-attr.vue'),
    )
    const injectedContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-attr-injected.vue'),
    )
    const ret = transform(content.toString(), 'test-attr.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })

  test('correct conversion both.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-both.vue'),
    )
    const injectedContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-both-injected.vue'),
    )
    const ret = transform(content.toString(), 'test-both.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })

  test('script setup but have no name or inheritAttrs. No need to inject.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-non-inject.vue'),
    )
    const ret = transform(content.toString(), 'test-non-inject.vue')
    expect(ret?.code).toBe(content.toString())
  })

  test('have no scriptSetup, No need to inject.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-only-script.vue'),
    )
    const ret = transform(content.toString(), 'test-only-script.vue')
    expect(ret).toBe(null)
  })

  test('have script and scriptSetup, No need to inject.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-script-scriptsetup.vue'),
    )
    const ret = transform(content.toString(), 'test-script-scriptsetup.vue')
    expect(ret).toBe(null)
  })
})
