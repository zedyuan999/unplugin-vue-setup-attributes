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
    const ret = transform(content.toString(), 'test.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })

  test('correct conversion attributes.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-attr.vue'),
    )
    const injectedContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-attr-injected.vue'),
    )
    const ret = transform(content.toString(), 'test.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })

  test('correct conversion both.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-both.vue'),
    )
    const injectedContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-both-injected.vue'),
    )
    const ret = transform(content.toString(), 'test.vue')
    expect(ret?.code).toEqual(injectedContent.toString())
  })
  test('have no scriptSetup, No need to inject.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-non-inject.vue'),
    )
    const ret = transform(content.toString(), 'test-non-inject.vue')
    expect(ret).toBe(null)
  })

  test('have script and scriptSetup, No need to inject.', async () => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-had-name.vue'),
    )
    const ret = transform(content.toString(), 'test-non-inject.vue')
    expect(ret).toBe(null)
  })

  // test('make sure name.', async () => {
  //   const { name } = await createVitePlugin()
  //   expect(name).toEqual('vite:setup-name-support')
  // })

  // test('not a vue file.', async () => {
  //   const { transform } = await createVitePlugin()
  //   const ret = await transform('code', 'index.html')
  //   expect(ret).toBe(null)
  // })

  // test('disable name.', async () => {
  //   const { transform } = plugin({ name: false })
  //   const ret = await (transform as any)('code', 'index.vue')
  //   expect(ret).toBe(null)
  // })

  // test('correct conversion name.', async () => {
  //   const content = await fs.readFile(
  //     path.resolve(__dirname, './fixtures/test.vue'),
  //   )
  //   const injectedContent = await fs.readFile(
  //     path.resolve(__dirname, './fixtures/test-injected.vue'),
  //   )
  //   const ret = supportScriptName(content.toString(), 'test.vue')
  //   expect(ret?.code).toEqual(injectedContent.toString())
  // })

  // test('No need to inject.', async () => {
  //   const content = await fs.readFile(
  //     path.resolve(__dirname, './fixtures/test-non-inject.vue'),
  //   )
  //   const ret = supportScriptName(content.toString(), 'test-non-inject.vue')
  //   expect(ret).toBe(null)
  // })
})
