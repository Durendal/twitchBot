import * as types from './types';

const initialSocialState = {
  durendalz: {
      facebook: '',
      twitter: '',
      discord: '',
      youtube: '',
  },
};

const smediaReducer = (state = initialSocialState, action) => {

  const { type, payload } = action;

  switch(type) {

    case types.ADD_CHANNEL_FACEBOOK:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          facebook: payload.facebook,
        },
      };
      break;

    case types.ADD_CHANNEL_TWITTER:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          twitter: payload.twitter,
        },
      };
      break;

    case types.ADD_CHANNEL_DISCORD:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          discord: payload.discord,
        },
      };
      break;

    case types.ADD_CHANNEL_YOUTUBE:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          youtube: payload.youtube,
        },
      };
      break;

    case types.DEL_CHANNEL_FACEBOOK:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          facebook: '',
        },
      };
      break;

    case types.DEL_CHANNEL_TWITTER:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          twitter: '',
        },
      };
      break;

    case types.DEL_CHANNEL_DISCORD:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          discord: '',
        },
      };
      break;

    case types.DEL_CHANNEL_YOUTUBE:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          youtube: '',
        },
      };
      break;

    default:
      return state;
  };
};

export default smediaReducer;
