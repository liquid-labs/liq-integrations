import * as fsPath from 'path'

import { addPluginsHandler, addPluginsSetup } from '@liquid-labs/liq-plugins-lib'

const hostVersionRetriever = ({ app }) => app.ext.serverVersion

const pluginType = 'integrations'
const pluginsDesc = 'integrations'

const { help, method, parameters } =
  addPluginsSetup({ hostVersionRetriever, pluginsDesc, pluginType })

const path = ['server', 'plugins', 'integrations', 'add']

const installedPluginsRetriever = ({ app }) => app.ext.integrations.listInstalledPlugins()
const pluginPkgDirRetriever = ({ app }) => fsPath.join(app.ext.serverHome, 'plugins', 'integrations')

const func = addPluginsHandler({
  hostVersionRetriever,
  installedPluginsRetriever,
  pluginsDesc,
  pluginPkgDirRetriever,
  pluginType
})

export { func, help, method, parameters, path }
