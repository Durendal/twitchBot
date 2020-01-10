/* get list of channels */
const getChannels = (state) => (
  state.bot.channels
);

/* get bot owner */
const getOwner = (state) => (
  state.bot.owner
);

/* check if user is owner */
const isOwner = (state, user) => (
  state.bot.owner === user
);

/* check if bot is in channel */
const inChannel = (state, channel) => (
  state.bot.channels.includes(channel)
);

export {
  getChannels,
  getOwner,
  isOwner,
  inChannel,
};
