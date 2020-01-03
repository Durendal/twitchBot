const getPollById = (state, poll_id) => state.polls[poll_id];

const getPollName = (state, poll_id) => state.polls[poll_id].poll_name;

const getPollOptions = (state, poll_id) => state.polls[poll_id].poll_options;

const getOptionNames = (state, poll_id) => state.polls[poll_id].poll_options.map(option => option.option_name).join(', ');

const getNumOptions = (state, poll_id) => state.polls[poll_id].poll_options.length;

const pollIsOpen = (state, poll_id) => state.polls[poll_id].poll_is_open;

const getOptionById = (state, poll_id, option_id) => state.polls[poll_id].poll_options[option_id];

export {
  getPollById,
  getPollName,
  getPollOptions,
  getOptionNames,
  getNumOptions,
  pollIsOpen,
  getOptionById,
};
