import * as types from './types';

// Add a command
const addCommand = payload => ({
  type: types.ADD_COMMAND,
  payload,
});

// Remove a command
const delCommand = payload => ({
  type: types.DELETE_COMMAND,
  payload,
});

// Enable a command
const enableCommand = payload => ({
  type: types.ENABLE_COMMAND,
  payload,
});

// Disable a command
const disableCommand = payload => ({
  type: types.DISABLE_COMMAND,
  payload,
});

export {
  addCommand,
  delCommand,
  enableCommand,
  disableCommand,
};
