import * as types from './types';

//Update URL trivia questions are drawn from
const updateURL = payload => ({
  type: types.TRIVIA_UPDATE_URL,
  payload,
});

// add channel to trivia list
const addChannel = payload => ({
  type: types.TRIVIA_ADD_CHANNEL,
  payload,
});

// remove channel from trivia list
const delChannel = payload => ({
  type: types.TRIVIA_DEL_CHANNEL,
  payload,
});

const updateLength = payload => ({
  type: types.TRIVIA_UPDATE_LENGTH,
  payload,
});

const updateInterval = payload => ({
  type: types.TRIVIA_UPDATE_INTERVAL,
  payload,
});

const updateCount = payload => ({
  type: types.TRIVIA_UPDATE_COUNT,
  payload,
});

const setActive = payload => ({
  type: types.TRIVIA_ACTIVE_INACTIVE,
  payload,
});

const addWinner = payload => ({
  type: types.TRIVIA_ADD_WINNER,
  payload,
});

const updateWinner = payload => ({
  type: types.TRIVIA_UPDATE_WINNER,
  payload,
});

const newRound = payload => ({
  type: types.TRIVIA_NEW_ROUND,
  payload,
});

export {
  updateURL,
  addChannel,
  delChannel,
  updateLength,
  updateInterval,
  updateCount,
  setActive,
  addWinner,
  updateWinner,
  newRound,
};
