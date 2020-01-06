/* get a poll object from a given poll_id */
const getPollById = (state, poll_id) => state.polls[poll_id];

/* get the name of a given poll */
const getPollName = (state, poll_id) => state.polls[poll_id].poll_name;

/* get the highest voted option for a given poll */
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

/* get all option objects for a given poll_id */
const getPollOptions = (state, poll_id) => {
  return state.polls[poll_id].poll_options;
}

/* get a list of all option names for a given poll_id */
const getOptionNames = (state, poll_id) => state.polls[poll_id].poll_options.map(option => option.option_name).join(', ');

/* get the number of options for a given poll_id */
const getNumOptions = (state, poll_id) => state.polls[poll_id].poll_options.length;

/* check if a poll is open */
const pollIsOpen = (state, poll_id) => state.polls[poll_id].poll_is_open;

/* get an option from its id number */
const getOptionById = (state, poll_id, option_id) => state.polls[poll_id].poll_options[option_id];

/* get a list of polls available */
const listPolls = (state) => state.polls.map((poll) => ({ poll_id: state.polls.indexOf(poll), poll_name: poll.poll_name }) );

/* get the ID associated with an option from its name */
const getOptionIdByName = (state, poll_id, option_name) => {
  return getPollOptions(state, poll_id)
    .map(option => {
      if(option.option_name.toLowerCase() === option_name.toLowerCase())
        return option.option_id;
    })[0];
};

/* check if a given poll_id is valid */
const pollExists = (state, poll_id) => {
  return !(typeof state.polls[poll_id] === 'undefined');
}

/* get the option_id of a users vote */
const getUserVoteID = (state, poll_id, username) => {
  state.polls[poll_id].poll_options
    .forEach(option => {
      if(option.option_voters.includes(username))
        return option.option_id;
    });
  return -1;
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
  pollExists,
};
