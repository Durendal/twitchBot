const { logMessage } = require('../utils').logging;
const { state } = require('../config');
const { getUserName } = require('../utils').users;
const { client } = require('../utils').client;

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
