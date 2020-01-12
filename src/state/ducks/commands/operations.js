import * as actions from './actions';

/**
  Add a command to the store
  @param {String} command_name - The name of the command
  @param {Boolean} enabled - Whether or not the command is enabled
  @param {String} author - The author of the module the command is from
  @param {String} module - The module the command is in
 */
const addCommand = (
  command_name,
  enabled,
  loaded,
  author,
  module,
) => async (dispatch) => {
  try {
    dispatch(actions.addCommand({
      command_name,
      enabled,
      loaded,
      author,
      module
    }));
  } catch (error) {
    console.log(error);
  }
};

/**
  Remove a command from the store
  @param {Number} command_id - The index of the command in the store
 */
const delCommand = (command_id) => async (dispatch) => {
  try {
    dispatch(actions.delCommand({ command_id }));
  } catch (error) {
    console.log(error);
  }
};

/**
  Enable a command in the store
  @param {Number} command_id - The index of the command in the store
 */
const enableCommand = (command_id) => async (dispatch) => {
  try {
    dispatch(actions.enableCommand({ command_id }));
  } catch (error) {
    console.log(error);
  }
};

/**
  Disable a command in the store
  @param {Number} command_id - The index of the command in the store
 */
const disableCommand = (command_id) => async (dispatch) => {
  try {
    dispatch(actions.disableCommand({ command_id }));
  } catch (error) {
    console.log(error);
  }
};

export {
  addCommand,
  delCommand,
  enableCommand,
  disableCommand,
};
