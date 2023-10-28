const IntegrationsManager = class {
  #providers = {}

  async callHook({ providerFor, providerArgs, hook, hookArgs }) {
    const hookFunc = this.#getHook({ providerFor, providerArgs, hook })

    const hookResult = hookFunc(hookArgs)
    return hookResult.then === undefined ? hookResult : await hookResult
  }

  #getHook({ providerFor, providerArgs, hook, noThrow }) {
    const providerOptions = this.#providers[providerFor] || []

    const filteredOptions = providerOptions.filter((po) => po.providerTest(providerArgs))
    if (filteredOptions.length === 0) {
      if (noThrow === true) {
        return undefined
      }
      throw new Error(`No provider found for '${providerFor}'.`)
    }
    else if (filteredOptions.length > 1) {
      throw new Error(`Ambiguous multiple providers found for '${providerFor}'.`)
    }

    const { name, hooks } = filteredOptions[0]
    const hookFunc = hooks[hook]

    if (hookFunc === undefined && noThrow !== true) {
      throw new Error(`No such hook '${hook}' found in provider '${name}' (of class '${providerFor}').`)
    }

    return hookFunc
  }

  hasHook({ providerFor, providerArgs, hook }) {
    const hookFunc = this.#getHook({ providerFor, providerArgs, hook, noThrow : true })

    return !!hookFunc
  }

  listInstalledPlugins() {
    // return Object.values(this.#providers).reduce((acc, { name, npmName }) => {
    const list = Object.values(this.#providers).reduce((acc, entries) => {
      acc.push(...entries.map(({ name, npmName, hooks }) => ({ name, npmName, hooks : Object.keys(hooks) })))
      return acc
    }, [])
      .filter((v, i, a) => i === a.findIndex(({ name }) => name === v.name))

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
