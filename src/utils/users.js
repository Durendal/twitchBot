require('./admins');
const { checkMap } = require('src/utils/maps');
const { logMessage } = require('src/utils/logging');
const { client } = require('src/utils/client');
const { state } = require('src/config');

/**
  Check if a given user has already cast a vote
  @param {String} username - The name of the user to check
  @param {String} target - The twitch channel to check the user in
 */
function checkUser(username, target) {
  if(!(username in state['voters'])) {
    return true;
  }
  client.say(target, `${username} has already cast a vote.`);
  return false;
}

/**
  Return the username from a given user context
  @param {Object} context - The user context to extract a username from
 */
function getUserName(context) {
  return context['username'];
}

module.exports = {
  checkUser,
  getUserName,
};
