const { logMessage } = require('./logging');
const { state } = require('../config');

function isAdmin(user) {
  return state['admins'].includes(user);
}

function checkContext(target, context) {
  if(!isAdmin(context['username']))
    return;
  logMessage(target, `Context: ${JSON.stringify(context)}`);
}

module.exports = {
  isAdmin,
  checkContext,
}
