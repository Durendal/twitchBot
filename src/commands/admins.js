const { logMessage } = require('src/utils').logging;
const { state } = require('src/config');
const { getUserName } = require('src/utils').users;
const { client } = require('src/utils').client;
const { isAdmin } = require('src/utils').admins;

/**
  Write the context of the current user to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
function checkContext(target, context) {
  if(!isAdmin(target, context))
    return;
  logMessage(target, `Context: ${JSON.stringify(context)}`);
}

/**
  Write the state of the bot to the bots console.log
  @param {String} target - The channel the user wrote the command in
  @param {Object} context - The context of the user who wrote the command
 */
function checkState(target, context) {
  if(!isAdmin(target, context))
    return;
  logMessage(target, `State: ${JSON.stringify(state)}`);
}

/**
  Add a user to the list of administrators
  @param {String} user - The name of the user to add as an admin
  @param {String} target - The twitch channel to add the mod to
  @param {Object} context - The context of the user adding the mod
 */
function addMod(user, target, context) {
  if(!isAdmin(target, context))
    return;
  state['admins'].push(user)
}

/**
  Add a user to the list of administrators
  @param {String} user - The name of the user to delete from mods
  @param {String} target - The twitch channel to delete the mod from
  @param {Object} context - The context of the user removing the mod
 */
function delMod(user, target, context) {
  if(!isAdmin(target, context))
    return;

  const index = state['admins'].indexOf(user);

  if (index > -1)
    state['admins'].splice(index, 1);
}

/**
  List all currently set moderators (doesn't account for twitch mods)
  @param {String} target - The twitch channel to check for moderators
  @param {Object} context - The context of the user sending the command
 */
function listMods(target, context) {
  if(!isAdmin(target, context))
    return;

  client.say(target, `Mods: ${state['admins'].join(', ')}`);
}

module.exports = {
  checkContext,
  checkState,
  addMod,
  delMod,
  listMods,
};
