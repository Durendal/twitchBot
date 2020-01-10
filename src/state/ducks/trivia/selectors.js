/* get the trivia URL */
const getTriviaURL = (state) => (
  state.trivia.trivia_url
);

/* get a channels information */
const getChannelInfo = (state, channel) => (
  state.trivia[channel]
);

/* get the number of minutes a question is open for */
const getNumMins = (state, channel) => (
  state.trivia[channel].question_length
);

/* get the number of minutes between questions */
const getIntervalMins = (state, channel) => (
  state.trivia[channel].question_interval
);

/* get the number of questions in a round */
const getNumQuestions = (state, channel) => (
  state.trivia[channel].question_count
);

/* check if trivia is active in a given channel */
const isActive = (state, channel) => (
  state.trivia[channel].active
);

/* get the list of winner objects */
const getWinners = (state, channel) => (
  state.trivia[channel].winners
);

/* get a specific winner object */
const getWinner = (state, channel, username) => (
  getWinners(state, channel)[username]
);

/* check if a channel is registered with the bot for trivia */
const channelRegistered = (state, channel) => (
  Object.keys(state.trivia).includes(channel)
);

/* check if a user is registered with the bot in a given channel */
const userRegistered = (state, channel, username) => (
  channelRegistered(channel)
    ? Object.keys(state.trivia[channel].includes(username))
    : false
);

export {
  getTriviaURL,
  getChannelInfo,
  getNumMins,
  getIntervalMins,
  getNumQuestions,
  isActive,
  getWinners,
  getWinner,
  channelRegistered,
  userRegistered,
};
