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

function castVote(username, map, target) {
  // Ensure the map and user are valid
  if((!checkMap(map, target)) || (!checkUser(username, target))) { return; }

  state['voters'][username] = map;
  state["maps"][map] += 1;

}

function clearVote(username, target) {

  if( username in state['voters']) {
    state['maps'][state['voters'][username]] -= 1;
    delete state['voters'][username];
    logMessage(target, `Voters: ${JSON.stringify(state['voters'])}`);
    return;
  }
  logMessage(target, `Voters: ${JSON.stringify(state['voters'])}`);
  client.say(target, `${username} has not yet cast a vote to clear.`);
}

module.exports = {
  checkUser,
  castVote,
  clearVote
};
