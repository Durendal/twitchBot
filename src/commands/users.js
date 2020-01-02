import { checkMap } from 'src/utils/maps';
import { checkUser } from 'src/utils/users';
import { state } from 'src/config';
import { logMessage } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { isOpen } from 'src/utils/rounds';

/**
  Cast a vote for a map
  @param {String} username - The user casting the vote
  @param {String} map - The map being voted for
  @param {String} target - The twitch channel the vote is taking place in
 */
function castVote(username, map, target) {
  // Ensure the map and user are valid
  if((!checkMap(map, target)) || (!checkUser(username, target))) { return; }

  state['voters'][username] = map;
  state["maps"][map] += 1;

}

/**
  Remove a users vote for a map
  @param {String} username - The user revoking their vote
  @param {String} channel - The channel the vote is being revoked in
 */
function clearVote(username, target) {
  if(!isOpen())
    return;

  if( username in state['voters']) {
    state['maps'][state['voters'][username]] -= 1;
    delete state['voters'][username];
    logMessage(target, `Voters: ${JSON.stringify(state['voters'])}`);
    return;
  }
  logMessage(target, `Voters: ${JSON.stringify(state['voters'])}`);
  client.say(target, `${username} has not yet cast a vote to clear.`);
}

export {
  castVote,
  clearVote,
}
