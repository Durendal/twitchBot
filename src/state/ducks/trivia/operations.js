import * as actions from './actions';
import * as selectors from './selectors';
import store from 'src/state/store';

const { getState, dispatch } from 'store';

/**
  update the URL trivia is drawn from
  @param {String} url - the URL trivia is drawn from
 */
const updateURL = (url) => async (dispatch) => {
  try {
    dispatch(actions.updateURL({ trivia_url }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the list of channels the bot is hosting trivia in
  @param {String} channel - The channel the bot is in
 */
const addChannel = (channel) => async (dispatch) => {
  try {
    if(!selectors.channelRegistered(getState(), channel))
      dispatch(actions.addChannel({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the list of channels the bot is hosting trivia in
  @param {String} channel - The channel the bot is in
 */
const delChannel = (channel) => async (dispatch) => {
  try {
    if(selectors.channelRegistered(getState(), channel))
      dispatch(actions.delChannel({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the number of minutes a question is open
  @param {Integer} length - The number of minutes a question is open
  @param {String} channel - The channel the bot is in
 */
const updateLength = (length, channel) => async (dispatch) => {
  try {
    if(selectors.channelRegistered(getState(), channel))
      dispatch(actions.updateLength({ length, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the interval between questions in minutes
  @param {Integer} interval - The number of minutes to wait between questions
  @param {String} channel - The channel the bot is in
 */
const updateInterval = (interval, channel) => async (dispatch) => {
  try {
    if(selectors.channelRegistered(getState(), channel))
      dispatch(actions.updateInterval({ interval, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update the number of questions to ask in a round
  @param {Integer} count - The number of questions to ask in a round
  @param {String} channel - The channel the bot is in
 */
const updateCount = (count, channel) => async (dispatch) => {
  try {
    if(selectors.channelRegistered(getState(), channel))
      dispatch(actions.updateCount({ count, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  update a users score in a given channel
  @param {String} username - The user to update
  @param {String} channel - The channel the bot is in
 */
const updateWinner = (username, channel) => async (dispatch) => {
  try {
    if(!selectors.userRegistered(getState, channel, username)
      dispatch(actions.addWinner({ username, channel }));
    dispatch(actions.updateWinner({ username, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  start a new trivia round in the given channel
  @param {String} channel - The channel the bot is in
 */
const newRound = (channel) => async (dispatch) => {
  try {
    dispatch(actions.newRound({ channel }));
  } catch (error) {
    console.log(error);
  }
};

export {
  updateURL,
  addChannel,
  delChannel,
  updateLength,
  updateInterval,
  updateCount,
  updateWinner,
  newRound,
};
