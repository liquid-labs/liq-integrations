import * as fsPath from 'node:path'

const installedPlugins = ({ app }) => app.ext._liqIntegrations.plugins

const pluginPackageDir = ({ app }) => process.env.LIQ_INTEGRATION_PLUGINS_PATH
    || fsPath.join(app.ext.serverHome, 'plugins', 'integrations')

export { installedPlugins, pluginPackageDir }