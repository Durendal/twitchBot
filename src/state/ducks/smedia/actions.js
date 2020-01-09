import * as types from './types';

const addFacebook = payload => ({
  type: types.ADD_CHANNEL_FACEBOOK,
  payload,
});

const addTwitter = payload => ({
  type: types.ADD_CHANNEL_TWITTER,
  payload,
});

const addDiscord = payload => ({
  type: types.ADD_CHANNEL_DISCORD,
  payload,
});

const addYoutube = payload => ({
  type: types.ADD_CHANNEL_YOUTUBE,
  payload,
});

const delFacebook = payload => ({
  type: types.DEL_CHANNEL_FACEBOOK,
  payload,
});

const delTwitter = payload => ({
  type: types.DEL_CHANNEL_TWITTER,
  payload,
});

const delDiscord = payload => ({
  type: types.DEL_CHANNEL_DISCORD,
  payload,
});

const delYoutube = payload => ({
  type: types.DEL_CHANNEL_YOUTUBE,
  payload,
});

export {
  addFacebook,
  addTwitter,
  addDiscord,
  addYoutube,
  delFacebook,
  delTwitter,
  delDiscord,
  delYoutube,
};
