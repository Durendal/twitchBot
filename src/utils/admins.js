const { state } = require('src/config');
const { addLog } = require('src/utils').logging;


/**
  Verifies if user is an admin or twitch mod
  @param {String} target - The target channel
  @param {Object} context - The user context
*/
function isAdmin(target, context) {

  user = getUserName(context);

  addLog(`Attempting to verify ${user} is an Administrator`, 'info');

  // Check if user is a twitch mod, or the channel broadcaster
  let isMod = context.mod || context['user-type'] === 'mod';
  let isBroadcaster = target.slice(1) === context.username;
  let isModUp = isMod || isBroadcaster;

  // If the user is a twitch mod/broadcaster or in our admins list return true
  return isModUp || state['admins'].includes(user);
}

module.exports = {
  isAdmin,
}
