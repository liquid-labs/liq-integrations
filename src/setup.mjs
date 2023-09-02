import { IntegrationsManager } from './integrations-manager'

const setup = ({ app, model, reporter }) => {
  app.ext.integrations = new IntegrationsManager()
}

export { setup }
