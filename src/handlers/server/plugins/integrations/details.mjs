import { detailsPluginHandler, detailsPluginSetup } from '@liquid-labs/liq-plugins-lib'

const { help, method, parameters } = detailsPluginSetup({ pluginsDesc : 'integrations' })

const path = ['server', 'plugins', 'integrations', ':integrationPluginName', 'details']

const installedPluginsRetriever = ({ app }) => app.ext.integrations.listPlugins()

const func = detailsPluginHandler({ installedPluginsRetriever })

export { func, help, method, parameters, path }
