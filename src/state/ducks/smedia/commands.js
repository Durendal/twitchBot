import { smediaSelectors, smediaOperations } from 'src/state/ducks/smedia';
import { client } from 'src/utils/client';
import { logging } from 'src/utils';
import { parseMessage, getUserName } from 'src/utils/messages';
import store from 'src/state/store';

const { dispatch, getState } = store;

/**
  List facebook channel in chat
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const facebook = (msg, context, target) => {
  const fb = smediaSelectors.getFacebook(getState(), target);

  try {
    if(fb.length > 0)
      client.say(target, `Channel Facebook Account: ${fb}`);
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  List twitter channel in chat
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const twitter = (msg, context, target) => {
  try {
    const tw = smediaSelectors.getTwitter(getState(), target);
    if(tw.length > 0)
      client.say(target, `Channel Twitter Account: ${tw}`);
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  List discord channel in chat
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const discord = (msg, context, target) => {
  try {
    const dis = smediaSelectors.getDiscord(getState(), target);
    if(dis.length > 0)
      client.say(target, `Channel Discord Account: ${dis}`);
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  List youtube channel in chat
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const youtube = (msg, context, target) => {
  try {
    const yt = smediaSelectors.getYoutube(getState(), target);
    if(yt.length > 0)
      client.say(target, `Channel YouTube Account: ${yt}`);
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  Delete facebook channel from state
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const delFacebook = (msg, context, target) => {
  try {
    const { isAdmin } = parseMessage(msg, context, target);
    if(isAdmin)
      dispatch(smediaOperations.addFacebook('', target));
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  Delete twitter channel from state
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const delTwitter = (msg, context, target) => {
  try {
    const { isAdmin } = parseMessage(msg, context, target);
    if(isAdmin)
      dispatch(smediaOperations.addTwitter('', target));
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  Delete discord channel from state
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const delDiscord = (msg, context, target) => {
  try {
    const { isAdmin } = parseMessage(msg, context, target);
    if(isAdmin)
      dispatch(smediaOperations.addDiscord('', target));
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  Delete youtube channel from state
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const delYoutube = (msg, context, target) => {
  try {
    const { isAdmin } = parseMessage(msg, context, target);
    if(isAdmin)
      dispatch(smediaOperations.addYoutube('', target));
  } catch (error) {
    //console.log(error);
    return;
  }
};

/**
  Set a social media link
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const set = (msg, context, target) => {
  try {
    const { isAdmin, args } = parseMessage(msg, context, target, 2, '!set <platform> <url>')

    if(isAdmin) {

      const platform = args[0].toLowerCase();
      const url = args[1];

      switch(platform) {

        case 'facebook':
          dispatch(smediaOperations.addFacebook(url, target));
          break;

        case 'twitter':
          dispatch(smediaOperations.addTwitter(url, target));
          break;

        case 'discord':
          dispatch(smediaOperations.addDiscord(url, target));
          break;

        case 'youtube':
          dispatch(smediaOperations.addYoutube(url, target));
          break;

        default:
          break;
      }
    }
  } catch (error) {
    //console.log(error);
    return;
  }
};

export {
  facebook,
  twitter,
  discord,
  youtube,
  delFacebook,
  delTwitter,
  delDiscord,
  delYoutube,
  set,
};
