import * as fsPath from 'node:path'

import { npmPackageNameRE } from '@liquid-labs/regex-repo'

import { IntegrationsManager } from './integrations-manager'
import { pluginPackageDir } from './integrations/integration-controls'
import { registerIntegrations } from './integrations/register-integrations'

const setup = async({ app, reporter }) => {
  app.ext.setupMethods.push({
    name : 'setup integrations',
    func : async({ app, reporter }) => {
      app.ext.integrations = new IntegrationsManager()
    }
  })

  setupPathResolvers({ app })
}

const setupPathResolvers = ({ app }) => {
  app.ext.pathResolvers.integrationPluginName = {
    optionsFetcher : () => app.ext.integrations.listInstalledPlugins(),
    bitReString    : npmPackageNameRE.toString().slice(1, -1)
  }
}

export { setup }
