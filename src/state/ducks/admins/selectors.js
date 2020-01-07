/* get the admin level of a user in a given channel */
const getAdminLevel = (state, username, channel) => (
  state.admins[channel][username].admin_level
)
/* check if a user is an admin in a given channel */
const isAdmin = (state, username, channel) => (
  Object.keys(state.admins[channel]).includes(username)
);

/* get a list of moderators for a given channel */
const channelMods = (state, channel) => (
  Object.keys(state.admins[channel])
);

export {
  getAdminLevel,
  isAdmin,
  channelMods,
};
