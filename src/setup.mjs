import { npmPackageNameRE } from '@liquid-labs/regex-repo'

import { IntegrationsManager } from './integrations-manager'

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
