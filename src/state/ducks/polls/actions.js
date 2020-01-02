import * as types from './types';

const addPoll = payload => ({
  type: types.POLL_ADD,
  payload,
});

const delPoll = payload => ({
  type: types.POLL_DEL,
  payload,
});

const addPollOption = payload => ({
  type: types.POLL_OPTION_ADD,
  payload,
});

const delPollOption = payload => ({
  type: types.POLL_OPTION_DEL,
  payload,
});

const addPollVote = payload => ({
  type: types.POLL_VOTE_ADD,
  payload,
});

const delPollVote = payload => ({
  type: types.POLL_VOTE_DEL,
  payload,
});

const setPollActive = payload => ({
  type: types.POLL_ACTIVE_TRUE,
  payload,
});

const setPollInactive = payload => ({
  type: types.POLL_ACTIVE_FALSE,
  payload,
});

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
