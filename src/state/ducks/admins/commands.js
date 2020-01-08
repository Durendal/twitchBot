import { logMessage } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import { parseMessage } from 'src/utils/messages';
import store from 'src/state/store';

const { dispatch, getState } = store;

/**
  Write the context of the current user to the bots console.log
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const checkContext = (msg, context, target) => {
  const { username, args, isAdmin } = parseMessage(msg, context, target);
  if(!isAdmin)
    return;

  logMessage(target, `Context: ${JSON.stringify(context, null, 2)}`);
};

/**
  Write the state of the bot to the bots console.log
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const checkState = (msg, context, target) => {
  const { username, isAdmin } = parseMessage(msg, context, target);

  if(!isAdmin)
    return;

  logMessage(target, `State: ${JSON.stringify(getState(), null, 2)}`);
};

/**
  Add a user to the list of administrators
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const addMod = (msg, context, target) => {

  const { username, args, isAdmin } = parseMessage(msg, context, target);

  const user_to_mod = args[0];
  const mod_level = args[1];

  if(!isAdmin)
    return;

  console.log(`${username} attempting to mod ${user_to_mod} with level ${mod_level} in ${target}`);
  try {
    dispatch(adminOperations.addAdmin(user_to_mod, target, mod_level));
  } catch (error) {
    console.log(error);
  }
};

/**
  Add a user to the list of administrators
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const delMod = (msg, context, target) => {
  const { username, args, isAdmin } = parseMessage(msg, context, target);
  const user_to_unmod = args[0];

  if(!isAdmin)
    return;
  if(Object.keys(getState()['admins'][target]).includes(user_to_unmod))
    dispatch(adminOperations.delAdmin(user_to_unmod, target));
};

/**
  List all currently set moderators (doesn't account for twitch mods)
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const listMods = (msg, context, target) => {
  const { isAdmin } = parseMessage(msg, context, target);

  if(!isAdmin)
    return;

  const admins = adminSelectors.channelMods(getState(), target);
  client.say(target, `Mods: ${admins.join(', ')}`);
};

export {
  checkContext,
  checkState,
  addMod,
  delMod,
  listMods,
};
