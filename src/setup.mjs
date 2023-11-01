import { existsSync } from 'node:fs'
import * as fsPath from 'node:path'

import findPlugins from 'find-plugins'

import { IntegrationsManager } from './integrations-manager'
import { pluginPackageDir } from './integrations/integration-controls'
import { registerIntegrations } from './integrations/register-integrations'

const loadPlugins = async({ app, reporter }) => {
  const pluginPath = pluginPackageDir({ app })
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

    const registration = registerIntegrationPlugins({ app, reporter })
    if (registration?.then !== undefined) {
      await registration
    }

    app.ext._liqIntegrations.plugins.push({ npmName })
  }
}

const setup = async({ app, reporter }) => {
  app.ext._liqIntegrations = {
    plugins : []
  }
  app.ext.setupMethods.push({
    name : 'setup and load integration plugins',
    func : async({ app, reporter }) => {
      app.ext.integrations = new IntegrationsManager()
      await loadPlugins({ app, reporter })
    }
  },
  {
    name : 'register integration plugin integrations',
    deps : ['setup and load integration plugins'],
    func : registerIntegrations
  })

  setupPathResolvers({ app })
}

const setupPathResolvers = ({ app }) => {
  app.ext.pathResolvers.integrationPluginName = {
    optionsFetcher : () => app.ext.integrations.listInstalledPlugins(),
    bitReString    : '[a-zA-Z0-9 _-]+'
  }
}

export { setup }
