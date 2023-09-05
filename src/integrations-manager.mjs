const IntegrationsManager = class {
  #providers = {}

  async callHook({ providerFor, providerArgs, hook, hookArgs }) {
    const providerOptions = this.#providers[providerFor]
    if (providerOptions === undefined) {
      throw new Error(`No such provider class '${providerFor}'.`)
    }

    const filteredOptions = providerOptions.filter((po) => po.providerTest(providerArgs))
    if (filteredOptions.length === 0) {
      throw new Error(`No provider found for '${providerFor}'.`)
    }
    else if (filteredOptions.length > 1) {
      throw new Error(`Ambiguous multiple providers found for '${providerFor}'.`)
    }

    const { name, hooks } = filteredOptions[0]
    const hookFunc = hooks[hook]
    if (hookFunc === undefined) {
      throw new Error(`No such hook '${hook}' found in provider '${name}' (of class '${providerFor}').`)
    }

    const hookResult = hookFunc(hookArgs)
    return hookResult.then === undefined ? hookResult : await hookResult
  }

  listInstalledPlugins() {
    // return Object.values(this.#providers).reduce((acc, { name, npmName }) => {
    console.log('Object.values:', Object.values(this.#providers))
    const list = Object.values(this.#providers).reduce((acc, entries) => {
      acc.push(...entries.map(({ name, npmName }) => ({ name, npmName })))
      return acc
    }, [])
      .filter((v, i, a) => i === a.findIndex(({ name }) => name === v.name))

    console.log('list:', list)
    return list
  }

  register({ hooks, name, npmName, providerFor, providerTest }) {
    if (!(providerFor in this.#providers)) {
      this.#providers[providerFor] = []
    }
    this.#providers[providerFor].push({ hooks, name, npmName, providerTest })
  }
}

export { IntegrationsManager }
