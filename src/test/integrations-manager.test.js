/* global describe expect fail test */
import { IntegrationsManager } from '../integrations-manager'

describe('IntegrationsManager', () => {
  const simpleIM = new IntegrationsManager()

  simpleIM.register({
    hooks        : { 'test hook' : () => 'hi!' },
    name         : 'test plugin',
    providerFor  : 'test stuff',
    providerTest : () => true,
    npmName      : '@acme/foo'
  })

  describe('callHook', () => {
    test('can register plugin and invoke synchronous hook', async() => {
      expect(await simpleIM.callHook({ providerFor : 'test stuff', hook : 'test hook' })).toBe('hi!')
    })

    test('can register plugin and invoke asynchronous hook', async() => {
      const simpleIM = new IntegrationsManager()

      simpleIM.register({
        hooks        : { 'test hook' : async() => new Promise(resolve => resolve('hi!')) },
        name         : 'test plugin',
        providerFor  : 'test stuff',
        providerTest : () => true,
        npmName      : '@acme/foo'
      })

      expect(await simpleIM.callHook({ providerFor : 'test stuff', hook : 'test hook' })).toBe('hi!')
    })

    test('passes provider test args', async() => {
      const im = new IntegrationsManager()

      im.register({
        hooks        : { 'test hook' : () => 'hi!' },
        name         : 'test plugin',
        providerFor  : 'test stuff',
        providerTest : ({ val }) => val === 'foo'
      })

      expect(await im.callHook({ providerFor : 'test stuff', providerArgs : { val : 'foo' }, hook : 'test hook' })).toBe('hi!')
    })

    test('passes hook args', async() => {
      const im = new IntegrationsManager()

      im.register({
        hooks        : { 'test hook' : ({ name }) => `hi ${name}!` },
        name         : 'test plugin',
        providerFor  : 'test stuff',
        providerTest : () => true
      })

      expect(await im.callHook({ providerFor : 'test stuff', hook : 'test hook', hookArgs : { name : 'foo' } })).toBe('hi foo!')
    })

    test('selects matching provider from multiple options', async() => {
      const im = new IntegrationsManager()

      im.register({
        hooks        : { hook : () => 1 },
        name         : 'test plugin 1',
        providerFor  : 'test stuff',
        providerTest : ({ v }) => v === 'foo'
      })

      im.register({
        hooks        : { hook : () => 2 },
        name         : 'test plugin 2',
        providerFor  : 'test stuff',
        providerTest : ({ v }) => v === 'bar'
      })

      expect(await im.callHook({ providerFor : 'test stuff', providerArgs : { v : 'foo' }, hook : 'hook' })).toBe(1)
      expect(await im.callHook({ providerFor : 'test stuff', providerArgs : { v : 'bar' }, hook : 'hook' })).toBe(2)
    })

    test("raises exception when no 'providerFor's found", (done) => {
      const im = new IntegrationsManager()

      im.callHook({ providerFor : 'test stuff', hook : 'test hook' })
        .then(() => {
          fail()
        })
        .catch((e) => {
          expect(e.message).toMatch(/No provider found for 'test stuff'/)
          done()
        })
    })

    test('raises error when multiple providers match', (done) => {
      const im = new IntegrationsManager()

      im.register({
        hooks        : { 'test hook' : () => 'hi!' },
        name         : 'test plugin 1',
        providerFor  : 'test stuff',
        providerTest : () => true
      })

      im.register({
        hooks        : { 'test hook' : () => 'bye!' },
        name         : 'test plugin 2',
        providerFor  : 'test stuff',
        providerTest : () => true
      })

      im.callHook({ providerFor : 'test stuff', hook : 'test hook' })
        .then(() => {
          fail()
        })
        .catch((e) => {
          expect(e.message).toMatch(/Ambiguous multiple/)
          done()
        })
    })

    test('raises error when no matching hook found in matching provider', (done) => {
      const im = new IntegrationsManager()

      im.register({
        hooks        : { 'test hook' : () => 'hi!' },
        name         : 'test plugin',
        providerFor  : 'test stuff',
        providerTest : () => true
      })

      im.callHook({ providerFor : 'test stuff', hook : 'another hook' })
        .then(() => {
          fail()
        })
        .catch((e) => {
          expect(e.message).toMatch(/No such hook/)
          done()
        })
    })
  })

  describe('listInstalledPlugins', () => {
    test('returns empty array for trivially empty IM', () => {
      const im = new IntegrationsManager()
      expect(im.listInstalledPlugins()).toEqual([])
    })

    test('lists installed hooks', () => {
      expect(simpleIM.listInstalledPlugins()).toEqual([
        { name : 'test plugin', npmName : '@acme/foo', hooks : ['test hook'] }
      ])
    })
  })

  describe('hasHook', () => {
    test('returns false on trivially empty IM', () => {
      const im = new IntegrationsManager()
      expect(im.hasHook({ providerFor : 'foo', hook : 'noHook' })).toBe(false)
    })

    test('returns false when there is a provider but no hook', () => {
      expect(simpleIM.hasHook({ providerFor : 'test stuff', hook : 'noHook' })).toBe(false)
    })

    test('returns true when there is a provider and hook', () => {
      expect(simpleIM.hasHook({ providerFor : 'test stuff', hook : 'test hook' })).toBe(true)
    })
  })
})
