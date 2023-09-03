/* global describe expect test */
import { IntegrationsManager } from '../integrations-manager'

describe('IntegrationsManager', () => {
  test('can register plugin and invoke hook', () => {
    const im = new IntegrationsManager()

    im.register({
      hooks        : { 'test hook' : () => 'hi!' },
      name         : 'test plugin',
      providerFor  : 'test stuff',
      providerTest : () => true
    })

    expect(im.callHook({ providerFor : 'test stuff', hook : 'test hook' })).toBe('hi!')
  })

  test('passes provider test args', () => {
    const im = new IntegrationsManager()

    im.register({
      hooks        : { 'test hook' : () => 'hi!' },
      name         : 'test plugin',
      providerFor  : 'test stuff',
      providerTest : ({ val }) => val === 'foo'
    })

    expect(im.callHook({ providerFor : 'test stuff', providerArgs : { val : 'foo' }, hook : 'test hook' })).toBe('hi!')
  })

  test('passes hook args', () => {
    const im = new IntegrationsManager()

    im.register({
      hooks        : { 'test hook' : ({ name }) => `hi ${name}!` },
      name         : 'test plugin',
      providerFor  : 'test stuff',
      providerTest : () => true
    })

    expect(im.callHook({ providerFor : 'test stuff', hook : 'test hook', hookArgs : { name : 'foo' } })).toBe('hi foo!')
  })

  test('selects matching provider from multiple options', () => {
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

    expect(im.callHook({ providerFor : 'test stuff', providerArgs : { v : 'foo' }, hook : 'hook' })).toBe(1)
    expect(im.callHook({ providerFor : 'test stuff', providerArgs : { v : 'bar' }, hook : 'hook' })).toBe(2)
  })

  test("raises exception when no 'providerFor's found", () => {
    const im = new IntegrationsManager()

    expect(() => im.callHook({ providerFor : 'test stuff', hook : 'test hook' }))
      .toThrow(/No such provider class 'test stuff'/)
  })

  test('raises error when multiple providers match', () => {
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

    expect(() => im.callHook({ providerFor : 'test stuff', hook : 'test hook' })).toThrow(/Ambiguous multiple/)
  })

  test('raises error when no matching hook found in matching provider', () => {
    const im = new IntegrationsManager()

    im.register({
      hooks        : { 'test hook' : () => 'hi!' },
      name         : 'test plugin',
      providerFor  : 'test stuff',
      providerTest : () => true
    })

    expect(() => im.callHook({ providerFor : 'test stuff', hook : 'another hook' })).toThrow(/No such hook/)
  })
})
