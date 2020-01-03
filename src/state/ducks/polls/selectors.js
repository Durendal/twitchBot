const getPollById = (state, poll_id) => state.polls[poll_id];

const getPollName = (state, poll_id) => state.polls[poll_id].poll_name;

const getTopOption = (state, poll_id) => {
  try {
    const result = getPollOptions(state, poll_id)
      .reduce((a, b) => {
        return a.option_vote_count > b.option_vote_count ? a : b
      });
    const index = state.polls[poll_id].poll_options.indexOf(result);
    return state.polls[poll_id].poll_options[index].option_vote_count === 0
      ? "None"
      : state.polls[poll_id].poll_options[index].option_name;

  } catch (error) {
    console.log(error);
    return "None";
  }
};

const getPollOptions = (state, poll_id) => {
  return state.polls[poll_id].poll_options;
}
const getOptionNames = (state, poll_id) => state.polls[poll_id].poll_options.map(option => option.option_name).join(', ');

const getNumOptions = (state, poll_id) => state.polls[poll_id].poll_options.length;

const pollIsOpen = (state, poll_id) => state.polls[poll_id].poll_is_open;

const getOptionById = (state, poll_id, option_id) => state.polls[poll_id].poll_options[option_id];

const listPolls = (state) => state.polls.map((poll) => ({ poll_id: state.polls.indexOf(poll), poll_name: poll.poll_name }) );

const getOptionIdByName = (state, poll_id, option_name) => {
  return getPollOptions(state, poll_id)
    .map(option => {
      if(option.option_name.toLowerCase() === option_name.toLowerCase())
        return option.option_id;
    })[0];
};

export {
  getPollById,
  getPollName,
  getPollOptions,
  getOptionNames,
  getNumOptions,
  pollIsOpen,
  getOptionById,
  getTopOption,
  listPolls,
  getOptionIdByName,
};
