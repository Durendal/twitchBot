import * as actions from './actions';

const addAdmin = (username) => async (dispatch) => {
  try {
    dispatch(actions.addAdmin({ username }));
  } catch (error) {
    console.log(error);
  }
};

const delAdmin = (username) => async (dispatch) => {
  try {
    dispatch(actions.delAdmin({ username }));
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

const addAdminChannel = (username, channel, mod_level) => async (dispatch) => {
  try {
    dispatch(actions.addAdminChannel({ username, channel, mod_level }));
  } catch (error) {
    console.log(error);
  }
};

const delAdminChannel = (username, channel) => async (dispatch) => {
  try {
    dispatch(actions.delAdminChannel({ username, channel }));
  } catch (error) {
    console.log(error);
  }
}
