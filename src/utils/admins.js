const { state } = require('../config');

function isAdmin(user) {
  return state['admins'].includes(user);
}

module.exports = {
  isAdmin,
}
