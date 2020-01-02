import * as actions from './actions';

const addPoll = (name) => async (dispatch) => {
  try {
    dispatch(actions.addPoll({ name }));
  } catch (error) {
    console.log(error);
  }
};

const delPoll = (poll_id) => async (dispatch) => {
  try {
    dispatch(actions.delPoll(poll_id));
  } catch (error) {
    console.log(error);
  }
};

const addPollOption = (poll_id, option_name) => async (dispatch) => {
  try {
    dispatch(actions.addPollOption({ poll_id, option_name }));
  } catch (error) {
    console.log(error);
  }
};

const delPollOption = (poll_id, option_id) => async (dispatch) => {
  try {
    dispatch(actions.delPollOption({ poll_id, option_id }));
  } catch (error) {
    console.log(error);
  }
};

const addPollVote = (poll_id, option_id, voter_name) => async (dispatch) => {
  try {
    dispatch(actions.addPollVote({ poll_id, option_id, voter_name }));
  } catch (error) {
    console.log(error);
  }
};

const delPollVote = (poll_id, option_id, voter_name) => async (dispatch) => {
  try {
      dispatch(actions.delPollVote({ poll_id, option_id, voter_name }));
  } catch (error) {
    console.log(error);
  }
};

const setPollActive = (poll_id) => async (dispatch) => {
  try {
    dispatch(actions.setPollActive({ poll_id }));
  } catch (error) {
    console.log(error);
  }
};

const setPollInactive = (poll_id) => async (dispatch) => {
  try {
    dispatch(actions.setPollInactive({ poll_id }));
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
