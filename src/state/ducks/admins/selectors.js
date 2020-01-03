const getAdminChannels = (state, username) => state.admins[username].channels;

const getAdminLevel = (state, username, channel) => state.admins[username].channels[channel].admin_level;

const isAdmin = (state, username, channel) => Object.keys(state.admins[username].channels).includes(channel);

export {
  getAdminChannels,
  getAdminLevel,
  isAdmin,
};
