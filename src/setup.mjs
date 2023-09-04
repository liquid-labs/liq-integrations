import { existsSync } from 'node:fs'
import * as fsPath from 'node:path'

import findPlugins from 'find-plugins'

import { LIQ_HOME } from '@liquid-labs/liq-defaults'

import { IntegrationsManager } from './integrations-manager'

const loadPlugins = async({ app, model, reporter }) => {
  const pluginPath = process.env.LIQ_INTEGRATION_PLUGINS_PATH || fsPath.join(LIQ_HOME(), 'plugins', 'integrations')
  const pluginPkg = fsPath.join(pluginPath, 'package.json')
  const pluginDir = fsPath.join(pluginPath, 'node_modules')

  reporter.log(`Searching for integration plugins (in ${fsPath.dirname(pluginDir)})...`)

  const pluginOptions = {
    pkg    : pluginPkg, // will load dependencies as plugins
    dir    : pluginDir, // will load from here
    filter : () => true // every dependency is a plugin
  }

  const plugins = existsSync(pluginPkg) ? findPlugins(pluginOptions) : []

  reporter.log(plugins.length === 0 ? 'No integration plugins found.' : `Found integration ${plugins.length} plugins.`)

  for (const { dir, pkg } of plugins) {
    const { main, name: npmName } = pkg
    const { name = 'UNKNOWN', registerIntegrationPlugins } = await import(`${dir}/${main}`) || {}
    if (registerIntegrationPlugins === undefined) {
      throw new Error(`'liq-integrations' plugin from '${npmName}' does not export 'registerIntegrationPlugins'; bailing out.`)
    }
    reporter.log(`Registering '${npmName}' (${name})...`)

    const registration = registerIntegrationPlugins({ app, model, reporter })
    if (registration?.then !== undefined) {
      await registration
    }
  }
}

const setup = async({ app, model, reporter }) => {
  app.ext.integrations = new IntegrationsManager()

  setupPathResolvers({ app })
  await loadPlugins({ app, model, reporter })
}

const setupPathResolvers = ({ app }) => {
  app.ext.pathResolvers.integrationPluginName = {
    optionsFetcher : () => {
      app.ext.integrations.listInstalledPlugins()
    },
    bitReString : '[a-zA-Z0-9 _-]+'
  }
}

export { setup }
