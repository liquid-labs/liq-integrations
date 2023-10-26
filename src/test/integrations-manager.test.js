/* global describe expect fail test */
import { IntegrationsManager } from '../integrations-manager'

describe('IntegrationsManager', () => {
  test('can register plugin and invoke hook', async() => {
    const im = new IntegrationsManager()

    im.register({
      hooks        : { 'test hook' : () => 'hi!' },
      name         : 'test plugin',
      providerFor  : 'test stuff',
      providerTest : () => true
    })

    expect(await im.callHook({ providerFor : 'test stuff', hook : 'test hook' })).toBe('hi!')
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
