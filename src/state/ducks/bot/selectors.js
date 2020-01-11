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

/* retrieve the numerical index of a channel in the store */
const channelID = (state, channel) => (
  state.bot.channels.indexOf(channel)
);

export {
  getChannels,
  getOwner,
  isOwner,
  inChannel,
  channelID,
};
