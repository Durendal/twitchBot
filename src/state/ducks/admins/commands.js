import { logMessage } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import { parseMessage } from 'src/utils/messages';
import store from 'src/state/store';

const { dispatch, getState } = store;

/**
  Write the context of the current user to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
const checkContext = (msg, context, target) => {
  const { username, args, isAdmin } = parseMessage(msg, context, target);
  if(!isAdmin)
    return;
  logMessage(target, `Context: ${JSON.stringify(context)}`);
};

/**
  Write the state of the bot to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
const checkState = (msg, context, target) => {
  const { username, isAdmin } = parseMessage(msg, context, target);

  if(!isAdmin)
    return;

  logMessage(target, `State: ${JSON.stringify(getState())}`);
};

/**
  Add a user to the list of administrators
  @param {String} user - The name of the user to add as an admin
  @param {String} target - The twitch channel to add the mod to
  @param {Object} context - The context of the user adding the mod
 */
const addMod = (msg, context, target) => {
  const { username, args, isAdmin } = parseMessage(msg, context, target);
  console.log(args);
  const user_to_mod = args[0];
  const mod_level = args[1];

  if(!isAdmin)
    return;

  console.log(isAdmin);
  console.log(`${username} attempting to mod ${user_to_mod} with level ${mod_level} in ${target}`);
  try {
    dispatch(adminOperations.addAdmin(user_to_mod));
    dispatch(
      adminOperations.addAdminChannel(
        user_to_mod,
        target.substring(1),
        mod_level
      )
    );
  } catch (error) {
    console.log(error);
  }
};

/**
  Add a user to the list of administrators
  @param {String} user - The name of the user to delete from mods
  @param {String} target - The twitch channel to delete the mod from
  @param {Object} context - The context of the user removing the mod
 */
const delMod = (msg, context, target) => {
  const { username, args, isAdmin } = parseMessage(msg, context, target);
  const user_to_unmod = args[0];
  console.log(`Unmodding: ${user_to_unmod}`);
  if(!isAdmin)
    return;
  if(Object.keys(getState()['admins'][user_to_unmod].channels).includes(target.substring(1)))
    dispatch(adminOperations.delAdminChannel(user_to_unmod, target));
};

/**
  List all currently set moderators (doesn't account for twitch mods)
  @param {String} target - The twitch channel to check for moderators
  @param {Object} context - The context of the user sending the command
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
