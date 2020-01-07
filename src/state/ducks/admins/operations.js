import * as actions from './actions';

const addAdmin = (username, channel, admin_level) => async (dispatch) => {
  try {
    dispatch(actions.addAdmin({ username, channel, admin_level }));
  } catch (error) {
    console.log(error);
  }
};

const delAdmin = (username, channel) => async (dispatch) => {
  try {
    dispatch(actions.delAdmin({ username, channel }));
  } catch (error) {
    console.log(error);
  }
};

const modAdminLevel = (username, channel, mod_level) => async (dispatch) => {
  try {
    dispatch(actions.modAdminLevel({ username, channel, mod_level }));
  } catch (error) {
    console.log(error);
  }
};

export {
  addAdmin,
  delAdmin,
  modAdminLevel,
};
