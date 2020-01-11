import * as types from './types';

const initialBotState = {
  channels: [],
  owner: 'durendalz',
};

const botReducer = (state = initialBotState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.BOT_JOIN_CHANNEL:
      return {
        ...state,
        channels: [
          ...state.channels.slice(),
          payload.channel,
        ],
      }
      break;

    case types.BOT_PART_CHANNEL:
      return {
        ...state,
        channels: [
          state.channels.slice(0, payload.channel_id),
          state.channels.slice(payload.channel_id + 1),
        ],
      }
      break;

    case types.BOT_CHANGE_OWNER:
      return {
        ...state,
        owner: payload.owner,
      }
      break;

    default:
      return {
        ...state,
      }
  };
};

export default botReducer;
