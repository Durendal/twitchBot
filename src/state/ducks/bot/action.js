import * as types from './types';

//join chan
const joinChan = payload => ({
  type: types.BOT_JOIN_CHANNEL
});

// part chan
const partChan = payload => ({
  type: types.BOT_PART_CHANNEL,
  payload,
});

// change owner
const changeOwner = payload => ({
  type: types.BOT_CHANGE_OWNER,
  payload,
});


export {
  joinChan,
  partChan,
  changeOwner,
};
