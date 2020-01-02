import * as types from './types';

/*
  poll elements: {
    polls: [
    {
      poll_name: String,
      poll_id: Integer,
      poll_is_open: Boolean,
      poll_options: [
        {
          option_vote_count: Integer,
          option_voters: Array,
          option_name: String,
          option_id: Integer,
        },
      ],
    },
  ],
}

*/

const initialPollState = {
    polls: [
      {
        poll_name: 'default poll',
        poll_id: 0,
        poll_is_open: false,
        poll_options: [
          {
            option_vote_count: 0,
            option_voters: [],
            option_name: 'option 1',
            option_id: 0,
          },
        ],
      },
    ],
    previous_id: 0,
};

const pollReducer = (state = initialPollState, action) => {

  switch(action.type) {
    case types.POLL_ADD:
      return {
        ...state,
        polls: [
          ...state.polls.slice(0, state.polls.length),
          {
            poll_name: action.payload.name,
            poll_id: state.previous_id,
            poll_is_open: false,
            poll_options: [],
          },
        ],
        previous_id: state.previous_id += 1,
      };

    case types.POLL_DEL:
      return {
        ...state,
        polls: [
          ...state['polls'].slice(0, action.payload.poll_id),
          ...state['polls'].slice(action.payload.poll_id + 1),
        ]
      };

    case types.POLL_OPTION_ADD:
      return {
        ...state,
        polls: [
          ...state.polls,
          {
            poll_options: [
              ...state.polls[action.payload.poll_id].poll_options.slice(
                0,
                state.polls[action.payload.poll_id].poll_options.length
              ),
              {
                option_vote_count: 0,
                option_voters: [],
                option_name: action.payload.option_name,
                option_id: 0,
              },
            ],
          },
        ],
      };

    case types.POLL_OPTION_DEL:
        return {
          ...state,
          polls: [
            ...state.polls,
            {
              ...state.polls[action.payload.poll_id],
              poll_options: [
                ...state['polls'][action.payload.poll_id].poll_options.slice(0, action.payload.option_id),
                ...state['polls'][action.payload.poll_id].poll_options.slice(action.payload.option_id + 1),
              ],
            },
          ],
        };

    case types.POLL_VOTE_ADD:
      return {
        ...state,
        polls: [
          ...state.polls,
          {
            poll_options: [
              ...state.polls[action.payload.poll_id].poll_options,
              {
                ...state.polls[action.payload.poll_id].poll_options[action.payload.option_id],
                option_vote_count: state.polls[action.payload.poll_id].poll_options[action.payload.option_id].option_vote_count += 1,
                option_voters: [
                  ...state.polls[action.payload.poll_id].poll_options[action.payload.option_id].option_voters,
                  action.payload.voter_name,
                ],
              },
            ],
          },
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
        polls: [
          ...state.polls,
          {
            poll_options: [
              ...state.polls[action.payload.poll_id].poll_options,
              {
                ...state.polls[action.payload.poll_id].poll_options[action.payload.option_id],
                option_vote_count: state.polls[action.payload.poll_id].poll_options[action.payload.option_id].option_vote_count -= 1,
                option_voters: [
                  ...state.polls[action.payload.poll_id].poll_options[action.payload.option_id].option_voters.slice(0, index),
                  ...state.polls[action.payload.poll_id].poll_options[action.payload.option_id].option_voters.slice(index + 1),
                ],
              },
            ],
          },
        ],
      };

    case types.POLL_ACTIVE_TRUE:
      const poll_active_true = state.polls.map((item, index) => {
        if(index !== action.payload.poll_id)
          return item;

        return {
          ...item,
          poll_is_open: true,
        }
      });

      return {
        ...state,
        polls: poll_active_true
    };

    case types.POLL_ACTIVE_FALSE:
      const poll_active_false = state.polls.map((item, index) => {
        if(index !== action.payload.poll_id)
          return item;

        return {
          ...item,
          poll_is_open: false,
        }
      });

      return {
        ...state,
        polls: poll_active_false
    };
    
    default:
      return state;
  };
};

export default pollReducer;
