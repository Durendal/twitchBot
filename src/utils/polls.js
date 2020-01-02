import { isAdmin } from 'src/utils/admins';
import { topMap } from 'src/utils/maps';
import { state } from 'src/config';
import { client } from 'src/utils/client';

/**
  Verify if a option is in our list of elligible options
  @param {String} option - The map name to check
  @param {String} target - The channel the map was checked from
  @return {Boolean} - Whether or not the map is valid
 */
function checkOption(option, poll_id, target) {
  const poll = state['channels'][target]['polls']['poll_id'];
  if(mapList().includes(map)) {
    return true;
  }
  client.say(target, `${map} is not a valid map.`);
  return false;
}

/**
  Returns a list of all currently elligible maps to vote on
 */
function optionList(target, poll_id) {
  const poll = state['channels'][target]['polls'][poll_id];
  return Object.keys(poll);
}

/**
  Ends a given tournament round ending map voting
  @param {String} target - The channel to end the round in
  @param {Object} context - The user context of the message sender
 */
function newRound(target, context) {
  if(!isAdmin(target, context))
    return;
  // Remove winning map from the voting pool
  const winner = topMap();
  delete state['maps'][winner];
  state['winningMaps'].append(winner);
}

/**
  Check if map voting is currently open
 */
function isOpen() {
  // Uncomment below line while testing to simulate times when voting is closed
  //return Math.ceil(Math.random() * 10) % 2 == 0;
  return true;
}

/**
  Return a poll from a specific channel
  @param {String} target - The twitch channel to check for polls
  @param {Integer} poll - The poll id to check
 */
function getPoll(target, poll) {
  return state['channels'][target]['polls'][poll]
}

export {
  newRound,
  isOpen,
  getPoll,
};
