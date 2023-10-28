import * as fsPath from 'path'

import { removePluginsHandler, removePluginsSetup } from '@liquid-labs/liq-plugins-lib'

const { help, method, parameters } = removePluginsSetup({ pluginsDesc : 'sever endpoint' })

const path = ['server', 'plugins', 'integrations', ':integrationPluginName', 'remove']

const installedPluginsRetriever = ({ app }) => app.ext.integrations.listPlugins()
const pluginPkgDirRetriever = ({ app }) => fsPath.join(app.ext.serverHome, 'plugins', 'integrations')

const func = removePluginsHandler({
  installedPluginsRetriever,
  nameKey : 'handlerPluginName',
  pluginPkgDirRetriever
})

export { func, help, method, parameters, path }
