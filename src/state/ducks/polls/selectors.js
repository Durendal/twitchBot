const getPollById = (state, poll_id) => state.polls[poll_id];

const getPollName = (state, poll_id) => state.polls[poll_id].poll_name;

const getPollOptions = (state, poll_id) => state.polls[poll_id].poll_options;

const getNumPollOptions = (state, poll_id) => state.polls[poll_id].poll_options.length;

const getPollIsOpen = (state, poll_id) => state.polls[poll_id].poll_is_open;

const getOptionById = (state, poll_id, option_id) => state.polls[poll_id].poll_options[option_id];

export {
  getPollById,
  getPollName,
  getPollOptions,
  getNumPollOptions,
  getPollIsOpen,
  getOptionById,
};
