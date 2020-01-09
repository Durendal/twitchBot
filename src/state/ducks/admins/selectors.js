/* get the admin level of a user in a given channel */
const getAdminLevel = (state, username, channel) => (
  state.admins[channel][username].admin_level
);

/* check if a user is an admin in a given channel */
const isAdmin = (state, username, channel) => (
  channel in state.admins
    ? Object.keys(state.admins[channel]).includes(username)
    : false
);

/* get a list of moderators for a given channel */
const channelMods = (state, channel) => (
  Object.keys(state.admins[channel])
);

/* check if the bot has any registered admins in the given channel */
const inChannel = (state, channel) => (
  channel in state.admins
);

export {
  getAdminLevel,
  isAdmin,
  channelMods,
  inChannel,
};
