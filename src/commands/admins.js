import { logMessage } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import { parseMessage } from 'src/utils/messages';
import { dispatch, getState } from 'src/state/store';

/**
  Write the context of the current user to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
function checkContext(msg, context, target) {
  const { username, arguments, isAdmin } = parseMessage(msg, context, target);
  if(!isAdmin)
    return;
  logMessage(target, `Context: ${JSON.stringify(context)}`);
};

/**
  Write the state of the bot to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
function checkState(msg, context, target) {
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
function addMod(msg, context, target) {
  const { username, arguments, isAdmin } = parseMessage(msg, context, target);
  const user_to_mod = arguments[0];

  if(!isAdmin)
    return;

  adminOperations.addAdmin(user_to_mod);
};

/**
  Add a user to the list of administrators
  @param {String} user - The name of the user to delete from mods
  @param {String} target - The twitch channel to delete the mod from
  @param {Object} context - The context of the user removing the mod
 */
function delMod(msg, context, target) {
  const { username, arguments, isAdmin } = parseMessage(msg, context, target);
  const user_to_unmod = arguments[0];

  if(!isAdmin)
    return;

  const index = getState()[user_to_unmod].indexOf(target);

  if (index > -1)
    adminOperations.delAdmin(user_to_unmod);
};

/**
  List all currently set moderators (doesn't account for twitch mods)
  @param {String} target - The twitch channel to check for moderators
  @param {Object} context - The context of the user sending the command
 */
function listMods(msg, context, target) {
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
