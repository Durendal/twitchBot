/* get a poll object from a given poll_id */
const getPollById = (state, poll_id, channel) => {
       return state.polls[channel][poll_id];
 };

/* get an option object from a given poll_id */
const getOptionById = (state, poll_id, option_id, channel) => {
    const options = getPollOptions(state, poll_id, channel);
    return getPollOptions(state, poll_id, channel)[option_id];
};

/* return the id of a given poll */
const getPollId = (state, poll, channel) => {
    return state.polls[channel].indexOf(poll);
};

/* return the id of a given poll option */
const getOptionId = (state, option, poll_id, channel) => {
    return getPollOptions(state, poll_id, channel).indexOf(option);
};

/* get the name of a given poll */
const getPollName = (state, poll_id, channel) => {
    return getPollById(state, poll_id, channel).poll_name;
};

/* get the highest voted option for a given poll */
const getTopOption = (state, poll_id, channel) => {
    try {
    const result = getPollOptions(state, poll_id, channel)
      .reduce((a, b) => {
        return a.option_vote_count > b.option_vote_count ? a : b
      });
    const index = getPollOptions(state, poll_id, channel).indexOf(result);
    return getPollOptions(state, poll_id, channel)[index].option_vote_count === 0
      ? "None"
      : getPollOptions(state, poll_id, channel)[index].option_name;

  } catch (error) {
    console.log(error);
    return "None";
  }
};

/* get all option objects for a given poll_id */
const getPollOptions = (state, poll_id, channel) => {
  return getPollById(state, poll_id, channel).poll_options;
};

/* get a list of all option names for a given poll_id */
const getOptionNames = (state, poll_id, channel) => {
    return getPollOptions(state, poll_id, channel).map(option => option.option_name).join(', ')
};

/* get the number of options for a given poll_id */
const getNumOptions = (state, poll_id, channel) => {
    return getPollOptions(state, poll_id, channel).length
};

/* check if a poll is open */
const pollIsOpen = (state, poll_id, channel) => {
  return getPollById(state, poll_id, channel).poll_is_open;
};

/* get a list of state.polls available */
const listPolls = (state, channel) => {
    return state.polls[channel].map((poll) => (
    {
      poll_id: state.polls[channel].indexOf(poll),
      poll_name: poll.poll_name
    }
  ))
};

/* get the ID associated with an option from its name */
const getOptionIdByName = (state, poll_id, option_name, channel) => {
    const option = getPollOptions(state, poll_id, channel)
    .filter(option => {

      return option.option_name.toLowerCase() === option_name.toLowerCase()
    })[0];

    return getOptionId(state, option, poll_id, channel);
};

/* check if a given poll_id is valid */
const pollExists = (state, poll_id, channel) => (
  typeof getPollById(state, poll_id, channel) !== 'undefined'
);

/* get the option_id of a users vote */
const getUserVoteID = (state, poll_id, username, channel) => {
  const voter = getPollOptions(state, poll_id, channel)
    .filter(option => (
      option.option_voters.includes(username)
    ))[0];
  console.log(`voter: ${JSON.stringify(voter, null, 2)}`);
  console.log(`option_id: ${getOptionId(state, voter, poll_id, channel)}`);
  return getOptionId(state, voter, poll_id, channel);
};

/* get the results of a given poll in a given channel */
const getResults = (state, poll_id, channel) => {
  const options = getPollOptions(state, poll_id, channel);
  var results = '';
  options.forEach(option => results += `${option.option_name} - ${option.option_vote_count}, `)

  return results.slice(0, -2);
};

/* check if a user has already voted on a given poll in a given channel */
const hasUserVoted = (state, poll_id, username, channel) => {
  const hasVoted = getPollOptions(state, poll_id, channel)
    .filter(option => (option.option_voters.includes(username)));

  return hasVoted.length > 0;
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
  getResults,
  hasUserVoted,
  getUserVoteID,
};
