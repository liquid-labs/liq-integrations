import { listPluginsHandler, listPluginsSetup } from '@liquid-labs/liq-plugins-lib'

const { help, method, parameters } = listPluginsSetup({ pluginsDesc : 'intgrations' })

const path = ['server', 'plugins', 'integrations', 'list']

const installedPluginsRetriever = ({ app }) => app.ext.integrations.listInstalledPlugins()
const hostVersionRetriever = ({ app }) => app.ext.serverVersion

const func = listPluginsHandler({ hostVersionRetriever, installedPluginsRetriever, pluginType : 'integrations' })

export { func, help, method, parameters, path }
