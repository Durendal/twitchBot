import * as types from './types';

const initialPollState = {
        durendalz: [
          {
            poll_name: 'CoH2 maps',
            poll_is_open: true,
            poll_options: [
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: 'Langreskaya',
              },
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: 'Crossing in the woods',
              },
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: 'Argentan',
              },
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: 'Carentan',
              },
            ],
        },
      ],
  };

const pollReducer = (state = initialPollState, action) => {

  const { type, payload } = action;

  switch(type) {

    case types.POLL_ADD:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, state[payload.channel].length),
          {
            poll_name: payload.name,
            poll_is_open: false,
            poll_options: [],
          },
        ],
        };

    case types.POLL_DEL:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_OPTION_ADD:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          {
            ...state[payload.channel][payload.poll_id],
            poll_options: [
              ...state[payload.channel][payload.poll_id].poll_options.slice(0, state[payload.channel][payload.poll_id].poll_options.length),
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: payload.option_name
              },
            ],
          },
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_OPTION_DEL:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          {
            ...state[payload.channel][payload.poll_id],
            poll_options: [
              ...state[payload.channel][payload.poll_id].poll_options.slice(0, payload.option_id),
              ...state[payload.channel][payload.poll_id].poll_options.slice(payload.option_id + 1),
            ],
          },
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_VOTE_ADD:
      return {
        ...state,
        [payload.channel]: [
            ...state[payload.channel].slice(0, payload.poll_id),
            {
              ...state[payload.channel][payload.poll_id],
              poll_options: [
                ...state[payload.channel][payload.poll_id].poll_options.slice(0, payload.option_id),
                {
                  ...state[payload.channel][payload.poll_id].poll_options[payload.option_id],
                  option_vote_count: state[payload.channel][payload.poll_id].poll_options[payload.option_id].option_vote_count + 1,
                  option_voters: [
                    ...state[payload.channel][payload.poll_id].poll_options[payload.option_id].option_voters.slice(),
                    payload.voter_name,
                  ],
                },
                ...state[payload.channel][payload.poll_id].poll_options.slice(payload.option_id + 1),
              ],
            },
            ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_VOTE_DEL:
      const index = state[payload.channel][payload.poll_id]
        .poll_options[payload.option_id]
        .option_voters
        .indexOf(payload.voter_name);

      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          {
            ...state[payload.channel][payload.poll_id],
            poll_options: [
              ...state[payload.channel][payload.poll_id].poll_options.slice(0, payload.option_id),
              {
                ...state[payload.channel][payload.poll_id].poll_options[payload.option_id],
                option_vote_count: state[payload.channel][payload.poll_id].poll_options[payload.option_id].option_vote_count - 1,
                option_voters: [
                  ...state[payload.channel][payload.poll_id].poll_options[payload.option_id].option_voters.slice(0, index),
                  ...state[payload.channel][payload.poll_id].poll_options[payload.option_id].option_voters.slice(index + 1),
                ],
              },
              ...state[payload.channel][payload.poll_id].poll_options.slice(payload.option_id + 1),
            ],
          },
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_ACTIVE_TRUE:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          {
            ...state[payload.channel][payload.poll_id],
            poll_is_open: true,
          },
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };

    case types.POLL_ACTIVE_FALSE:
      return {
        ...state,
        [payload.channel]: [
          ...state[payload.channel].slice(0, payload.poll_id),
          {
            ...state[payload.channel][payload.poll_id],
            poll_is_open: false,
          },
          ...state[payload.channel].slice(payload.poll_id + 1),
        ],
      };
      
    default:
      return state;
  };
};

export default pollReducer;
