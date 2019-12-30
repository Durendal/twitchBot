require('./admins');
const { checkMap } = require('./maps');
const { logMessage } = require('./logging');
const { client } = require('./client');
const { state } = require('../config');

function checkUser(username, target) {
  if(!(username in state['voters'])) {
    return true;
  }
  client.say(target, `${username} has already cast a vote.`);
  return false;
}

function getUserName(context) {
  return context['username'];
}

module.exports = {
  checkUser,
  getUserName,
};
