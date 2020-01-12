/* Retrieve a list of all modules */
const getModules = (state) => (
  [...new Set(state.commands.map(command => command.module))]
);

/* Retrieve a list of commands within a given module */
const getModuleCommands = (state, module_name) => (
  state.commands
    .filter(command => command.module === module_name)
    .map(command => command.command_name)
);

/* Retrieve a list of enabled modules */
const getEnabledCommands = (state) => (
  state.commands
    .filter(command => command.enabled === true)
    .map(command => command.command_name)
);

/* Retrieve a list of disabled modules */
const getDisabledCommands = (state) => (
  state.commands
    .filter(command => command.enabled === false)
    .map(command => command_name)
);

/* Retrieve a specific command by name */
const getCommandByName = (state, command_name) => (
  state.commands
    .filter(command => command.command_name === command_name)[0]
);

export {
  getModules,
  getModuleCommands,
  getEnabledCommands,
  getDisabledCommands,
  getCommandByName,
};
