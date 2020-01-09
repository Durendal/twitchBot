/* get channel facebook */
const getFacebook = (state, channel) => (
  channelSet(state, channel)
    ? state['smedia'][channel].facebook
    : ''
);

/* get channel twitter */
const getTwitter = (state, channel) => (
  channelSet(state, channel)
  ? state['smedia'][channel].twitter
  : ''
);

/* get channel discord */
const getDiscord = (state, channel) => (
  channelSet(state, channel)
  ? state['smedia'][channel].discord
  : ''
);

/* get channel youtube */
const getYoutube = (state, channel) => (
  channelSet(state, channel)
  ? state['smedia'][channel].youtube
  : ''
);

/* check if a channel is set in the store */
const channelSet = (state, channel) => (
  Object.keys(state['smedia']).includes(channel)
);

export {
  getFacebook,
  getTwitter,
  getDiscord,
  getYoutube,
  channelSet,
};
