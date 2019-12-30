const { checkMap } = require('src/utils/maps');
const { checkUser } = require('src/utils/users');
const { state } = require('src/config');
const { logMessage } = require('src/utils').logging;
const { client } = require('src/utils').client;

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
  castVote,
  clearVote,
}
