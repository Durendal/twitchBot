import * as actions from './actions';
import store from 'src/state/store';

const { getState, dispatch } from 'store';

/**
  update the list of channels the bot is idling in
  @param {String} channel - The channel the bot is in
 */
const addChannel = (channel) => async (dispatch) => {
  try {
    dispatch(actions.joinChannel({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the list of channels the bot is idling in
  @param {String} channel - The channel the bot has left
 */
const delChannel = (channel) => async (dispatch) => {
  try {
    dispatch(actions.partChannel({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  change the owner of the bot
  @param {String} owner the owner of the bot
 */
const changeOwner = (owner) => async (dispatch) => {
  try {
    dispatch(actions.changeOwner({ owner }));
  } catch (error) {
    console.log(error);
  }
};

export {
  addChannel,
  delChannel,
  changeOwner,
};
