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


  switch(action.type) {
    case types.POLL_ADD:

      return {
        ...state,
        [action.payload.channel]: [
          ...state[action.payload.channel].slice(0, state[action.payload.channel].length),
          {
            poll_name: action.payload.name,
            poll_id: state[channel].length,
            poll_is_open: false,
            poll_options: [],
          },
        ],
        };

    case types.POLL_DEL:

      return {
        ...state,
        [action.payload.channel]: [
          ...state[action.payload.channel].slice(0, action.payload.poll_id),
          ...state[action.payload.channel].slice(action.payload.poll_id + 1),
        ],
      };

    case types.POLL_OPTION_ADD:

      return {
        ...state,
        [action.payload.channel]: [
          ...state[action.payload.channel].slice(0, state[action.payload.channel].poll_options.length),
          {
            ...state[action.payload.channel][action.payload.poll_id],
            poll_options: [
              ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(),
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: action.payload.option_name,
                option_id: state[action.payload.channel][action.payload.poll_id].poll_options.length,
              },
            ],
          },
        ],
      };

    case types.POLL_OPTION_DEL:

      return {
        ...state,
        [action.payload.channel]: [
          {
            ...state[action.payload.channel][action.payload.poll_id],
            poll_options: [
              ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(0, action.payload.option_id),
              ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(action.payload.option_id + 1),
            ],
          },
        ],
      };

    case types.POLL_VOTE_ADD:

      return {
        ...state,
        [action.payload.channel]: [
            ...state[action.payload.channel].slice(0, action.payload.poll_id),
            {
              ...state[action.payload.channel][action.payload.poll_id],
              poll_options: [
                ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(0, action.payload.option_id),
                {
                  ...state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id],
                  option_vote_count: state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id].option_vote_count + 1,
                  option_voters: [
                    ...state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id].option_voters.slice(),
                    action.payload.voter_name,
                  ],
                },
                ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(action.payload.option_id + 1),
              ],
            },
            ...state[action.payload.channel].slice(action.payload.poll_id + 1),
        ],
      };

    case types.POLL_VOTE_DEL:

      const index = state
        .polls[action.payload.poll_id]
        .poll_options[action.payload.option_id]
        .option_voters
        .indexOf(action.payload.voter_name);

      return {
        ...state,
        [action.payload.channel]: [
          ...state[action.payload.channel].slice(0, action.payload.poll_id),
          {
            ...state[action.payload.channel][action.payload.poll_id],
            poll_options: [
              ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(0, action.payload.option_id),
              {
                ...state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id],
                option_vote_count: state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id].option_vote_count - 1,
                option_voters: [
                  ...state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id].option_voters.slice(0, index),
                  ...state[action.payload.channel][action.payload.poll_id].poll_options[action.payload.option_id].option_voters.slice(index + 1),
                ],
              },
              ...state[action.payload.channel][action.payload.poll_id].poll_options.slice(action.payload.option_id + 1),
            ],
          },
          ...state[action.payload.channel].slice(action.payload.poll_id + 1),
        ],
      };

    case types.POLL_ACTIVE_TRUE:

      const poll_active_true = state[action.payload.channel].map((item, index) => {
        if(index !== action.payload.poll_id)
          return item;

        return {
          ...item,
          poll_is_open: true,
        }
      });

      return {
        poll_active_true
      };

    case types.POLL_ACTIVE_FALSE:

      const poll_active_false = state[action.payload.channel].map((item, index) => {
        if(index !== action.payload.poll_id)
          return item;

        return {
          ...item,
          poll_is_open: false,
        }
      });

      return {
        poll_active_false
      };

    default:
      return state;
  };
};

export default pollReducer;
