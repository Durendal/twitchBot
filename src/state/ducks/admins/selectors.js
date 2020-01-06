/* get a list of channels that a user has admin status in */
const getAdminChannels = (state, username) => state.admins[username].channels;

/* get the admin level of a user in a given channel */
const getAdminLevel = (state, username, channel) => (
  state.admins[username].channels[channel].admin_level
)
/* check if a user is an admin in a given channel */
const isAdmin = (state, username, channel) => (
  true//Object.keys(state.admins[username].channels).includes(channel)
)

/* get a list of moderators for a given channel */
const channelMods = (state, channel) => {
  const mods = Object.keys(state.admins)
    .filter(admin => Object.keys(state.admins[admin].channels).includes(channel.substring(1)));

  return mods;
}

export {
  getAdminChannels,
  getAdminLevel,
  isAdmin,
  channelMods,
};
