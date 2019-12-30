const { logMessage } = require('src/utils').logging;
const { state } = require('src/config');
const { getUserName } = require('src/utils').users;
const { client } = require('src/utils').client;
const { isAdmin } = require('src/utils').admins;

function checkContext(target, context) {
  if(!isAdmin(getUserName(context)))
    return;
  logMessage(target, `Context: ${JSON.stringify(context)}`);
}

function addMod(user, context) {
  if(!isAdmin(getUserName(context)))
    return;
  state['admins'].push(user)
}

function delMod(user, context) {
  if(!isAdmin(getUserName(context)))
    return;

  const index = state['admins'].indexOf(user);

  if (index > -1)
    state['admins'].splice(index, 1);
}

function listMods(target, context) {
  if(!isAdmin(getUserName(context)))
    return;

  client.say(target, `Mods: ${state['admins'].join(', ')}`);
}

module.exports = {
  checkContext,
  addMod,
  delMod,
  listMods,
};
