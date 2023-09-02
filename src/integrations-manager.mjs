const IntegrationsManager = class {
  #providers = {}

  callPlugin({ providerFor, providerArgs, hook, hookArgs }) {
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
      throw new Error(`No such hook '${hook}' found for provider '${name}' (of class '${providerFor}'.`)
    }

    return hookFunc(hookArgs)
  }

  register({ hooks, name, providerFor, providerTest }) {
    if (!(providerFor in this.#providers)) {
      this.#providers[providerFor] = []
    }
    this.#providers[providerFor].push({ hooks, name, providerTest })
  }
}

export { IntegrationsManager }
