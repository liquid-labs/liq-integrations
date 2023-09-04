import * as fsPath from 'path'

import { LIQ_HOME } from '@liquid-labs/liq-defaults'
import { removePluginsHandler, removePluginsSetup } from '@liquid-labs/liq-plugins-lib'

const { help, method, parameters } = removePluginsSetup({ pluginsDesc : 'sever endpoint' })

const path = ['server', 'plugins', 'integrations', ':integrationPluginName', 'remove']

const installedPluginsRetriever = ({ app }) => app.ext.integrations.listPlugins()
const pluginPkgDirRetriever = () => fsPath.join(LIQ_HOME(), 'plugins', 'integrations')

const func = removePluginsHandler({
  installedPluginsRetriever,
  nameKey : 'handlerPluginName',
  pluginPkgDirRetriever
})

export { func, help, method, parameters, path }
