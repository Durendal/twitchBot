import * as types from './types';

//join chan
const joinChannel = payload => ({
  type: types.BOT_JOIN_CHANNEL,
  payload,
});

// part chan
const partChannel = payload => ({
  type: types.BOT_PART_CHANNEL,
  payload,
});

// change owner
const changeOwner = payload => ({
  type: types.BOT_CHANGE_OWNER,
  payload,
});


export {
  joinChannel,
  partChannel,
  changeOwner,
};
