require('./admins');
const { checkMap } = require('src/utils/maps');
const { logMessage } = require('src/utils/logging');
const { client } = require('src/utils/client');
const { state } = require('src/config');

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
