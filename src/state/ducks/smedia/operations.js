import * as actions from './actions';

/**
  add a facebook account to the given channel
  @param {String} facebook - The facebook account for the channel
  @param {String} channel - The channel the to add to
 */
const addFacebook = (facebook, channel) => async (dispatch) => {
  try {
    dispatch(actions.addFacebook({ facebook, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add a twitter account to the given channel
  @param {String} twitter - The twitter account for the channel
  @param {String} channel - The channel to add to
 */
const addTwitter = (twitter, channel) => async (dispatch) => {
  try {
    dispatch(actions.addTwitter({ twitter, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add a discord channel to the given channel
  @param {String} discord - The discord channel for the channel
  @param {String} channel - The channel to add to
 */
const addDiscord = (discord, channel) => async (dispatch) => {
  try {
    dispatch(actions.addDiscord({ discord, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  add a youtube channel to the given channel
  @param {String} youtube - The youtube channel for the channel
  @param {String} channel - The channel to add to
 */
const addYoutube = (youtube, channel) => async (dispatch) => {
  try {
    dispatch(actions.addYoutube({ youtube, channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  remove a facebook account from the given channel
  @param {String} channel - The channel the to remove from
 */
const delFacebook = (channel) => async (dispatch) => {
  try {
    dispatch(actions.delFacebook({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  remove a twitter account from the given channel
  @param {String} channel - The channel the to remove from
 */
const delTwitter = (channel) => async (dispatch) => {
  try {
    dispatch(actions.delTwitter({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  remove a discord channel from the given channel
  @param {String} channel - The channel the to remove from
 */
const delDiscord = (channel) => async (dispatch) => {
  try {
    dispatch(actions.delDiscord({ channel }));
  } catch (error) {
    console.log(error);
  }
};

/**
  remove a youtube channel from the given channel
  @param {String} channel - The channel the to remove from
 */
const delYoutube = (channel) => async (dispatch) => {
  try {
    dispatch(actions.delYoutube({ channel }));
  } catch (error) {
    console.log(error);
  }
};

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
