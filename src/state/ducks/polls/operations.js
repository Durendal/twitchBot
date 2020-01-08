import * as actions from './actions';

/**
  add a new poll to the given channel
  @param {String} name - The name of the poll
  @param {String} channel - The channel the poll is in
 */
const addPoll = (name, channel) => async (dispatch) => {
  try {
    dispatch(actions.addPoll({ name, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  delete a poll from the given channel
  @param {Integer} poll_id - The index of the poll to delete
  @param {String} channel - The channel the poll is in
 */
const delPoll = (poll_id, channel) => async (dispatch) => {
  try {
    dispatch(actions.delPoll({ poll_id, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add an option to a poll from the given channel
  @param {Integer} poll_id - The index of the poll to add an option to
  @param {String} option_name - The name of the option being added
  @param {String} channel - The channel the poll is in
 */
const addPollOption = (poll_id, option_name, channel) => async (dispatch) => {
  try {
    dispatch(actions.addPollOption({ poll_id, option_name, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add an option to a poll from the given channel
  @param {Integer} poll_id - The index of the poll to remove an option from
  @param {Integer} option_id - The index of the option being deleted
  @param {String} channel - The channel the poll is in
 */
const delPollOption = (poll_id, option_id, channel) => async (dispatch) => {
  try {
    dispatch(actions.delPollOption({ poll_id, option_id, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add a vote to a poll option in a given channel
  @param {Integer} poll_id - The index of the poll being voted on
  @param {Integer} option_id - The index of the option voted on
  @param {String} voter_name - The name of the user casting the vote
  @param {String} channel - The channel the poll is in
 */
const addPollVote = (poll_id, option_id, voter_name, channel) => async (dispatch) => {
  try {
    dispatch(actions.addPollVote({ poll_id, option_id, voter_name, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  delete a vote from a poll option in a given channel
  @param {Integer} poll_id - The index of the poll being modified
  @param {Integer} option_id - The index of the option being modified
  @param {String} voter_name - The name of the user recanting the vote
  @param {String} channel - The channel the poll is in
 */
const delPollVote = (poll_id, option_id, voter_name, channel) => async (dispatch) => {
  try {
      dispatch(actions.delPollVote({ poll_id, option_id, voter_name, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  enable voting for a given poll in a given channel
  @param {Integer} poll_id - The index of the poll being activated
  @param {String} channel - The channel the poll is in
 */
const setPollActive = (poll_id, channel) => async (dispatch) => {
  try {
    dispatch(actions.setPollActive({ poll_id, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  disable voting for a given poll in a given channel
  @param {Integer} poll_id - The index of the poll being deactivated
  @param {String} channel - The channel the poll is in
 */
const setPollInactive = (poll_id, channel) => async (dispatch) => {
  try {
    dispatch(actions.setPollInactive({ poll_id, channel }));
  } catch (error) {
    console.log(error);
  }
};

export {
  addPoll,
  delPoll,
  addPollOption,
  delPollOption,
  addPollVote,
  delPollVote,
  setPollActive,
  setPollInactive,
};
