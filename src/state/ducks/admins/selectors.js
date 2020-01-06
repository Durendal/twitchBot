/* get a list of channels that a user has admin status in */
const getAdminChannels = (state, username) => state.admins[username].channels;

/* get the admin level of a user in a given channel */
const getAdminLevel = (state, username, channel) => state.admins[username].channels[channel].admin_level;

/* check if a user is an admin in a given channel */
const isAdmin = (state, username, channel) => Object.keys(state.admins[username].channels).includes(channel);

export {
  getAdminChannels,
  getAdminLevel,
  isAdmin,
};
