import { installedPlugins, pluginPackageDir } from './integration-controls'

const registerIntegrations = async({ app, reporter }) => {
  reporter.log("Registering '@liquid-labs/liq-integrations' integretions...")
  app.ext.integrations.register({
    hooks        : { installedPlugins, pluginPackageDir },
    npmName      : '@liquid-labs/liq-integrations',
    providerFor  : 'integrations plugins',
    providerTest : () => true
  })
}

export { registerIntegrations }
