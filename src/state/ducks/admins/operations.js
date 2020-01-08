import * as actions from './actions';
/**
  add a bot administrator to a given channel
  @param {String} username - The username of the person to make an administrator
  @param {String} channel - The channel to add the administrator too
  @param {Integer} admin_level - The administration level to grant
 */
const addAdmin = (username, channel, admin_level) => async (dispatch) => {
  try {
    dispatch(actions.addAdmin({ username, channel, admin_level }));
  } catch (error) {
    console.log(error);
  }
};

/**
  remove a bot administrator from a given channel
  @param {String} username - The username of the person revoke privileges from
  @param {String} channel - The channel to remove the administrator from
 */
const delAdmin = (username, channel) => async (dispatch) => {
  try {
    dispatch(actions.delAdmin({ username, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  modify admin level a bot administrator to a given channel (alias to addAdmin)
  @param {String} username - The username of the person to make an administrator
  @param {String} channel - The channel to add the administrator too
  @param {Integer} admin_level - The administration level to grant
 */
const modAdminLevel = (username, channel, admin_level) => async (dispatch) => {
  try {
    dispatch(actions.addAdmin({ username, channel, admin_level }));
  } catch (error) {
    console.log(error);
  }
};

export {
  addAdmin,
  delAdmin,
  modAdminLevel,
};
