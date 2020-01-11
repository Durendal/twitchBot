import * as types from './types';

const initialTriviaState = {
  trivia_url: 'http://jservice.io/api/random',
  durendalz: {
    question_length: 2,
    question_interval: 1,
    question_count: 10,
    active: false,
    winners: {}
  },
};

const triviaReducer = (state = initialTriviaState, action) => {

  const { type, payload } = action;

  switch(type) {
    case types.TRIVIA_UPDATE_URL:
      return {
        ...state,
        trivia_url: payload.trivia_url,
      };
      break;
    case types.TRIVIA_ADD_CHANNEL:
      return {
        ...state,
        [payload.channel]: {
          question_length: 2,
          question_interval: 1,
          question_count: 10,
          active: false,
          winners: {},
        },
      };
      break;
    case types.TRIVIA_DEL_CHANNEL:
      const channel = Object.keys(state)
        .filter(chan_name => {
          return chan_name !== payload.channel
        })
        .reduce((chan, name) => {
          return {
            ...chan,
            [name]: state[name]
          };
        },
        {}
      );

      return {
        ...state,
        ...channel,
      };
      break;
    case types.TRIVIA_UPDATE_INTERVAL:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          question_interval: payload.interval,
        },
      };
      break;
    case types.TRIVIA_UPDATE_LENGTH:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          question_length: payload.length,
        },
      };
      break;
    case types.TRIVIA_UPDATE_COUNT:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          question_count: payload.count,
        },
      };
      break;
    case types.TRIVIA_ACTIVE_INACTIVE:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          active: payload.active,
        },
      };
      break;

    case types.TRIVIA_ADD_WINNER:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          winners: {
            ...state[payload.channel].winners,
            [payload.username]: {
              score: 0,
            },
          },
        },
      };
    case types.TRIVIA_UPDATE_WINNER:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          winners: {
            ...state[payload.channel].winners,
            [payload.username]: {
              ...state[payload.channel][payload.user],
              score: state[payload.channel][payload.user].score + payload.score,
            },
          },
        },
      };
      break;
    case types.TRIVIA_NEW_ROUND:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          active: false,
          winners: {},
        },
      };
      break;
    default:
      return {
        ...state,
      };
      break;
  };
};

export default triviaReducer;
