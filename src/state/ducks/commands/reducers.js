import * as types from './types';

const initialCommandState = [];

const commandReducer = (state = initialCommandState, action) => {

  const { type, payload } = action;

  switch (type) {
    case types.ADD_COMMAND:
      return [
        ...state.slice(0, state.length),
        {
          name: payload.command_name,
          enabled: payload.enabled,
          loaded: payload.loaded,
          author: payload.author,
          module: payload.module,
        },
      ];
      break;

    case types.DEL_COMMAND:
      return [
        ...state.slice(0, payload.command_id),
        ...state.slice(payload.command_id + 1),
      ];
      break;

    case types.ENABLE_COMMAND:
      return [
        ...state.slice(0, payload.command_id),
        {
          ...state[payload.command_id],
          enabled: true,
        },
        ...state.slice(payload.command_id + 1),
      ];
      break;

    case types.DISABLE_COMMAND:
      return [
        ...state.slice(0, payload.command_id),
        {
          ...state[payload.command_id],
          enabled: false,
        },
        ...state.slice(payload.command_id + 1),
      ];
      break;
  };
};

export default commandReducer;
