const { isAdmin } = require('src/utils/admins');
const { topMap } = require('src/utils/maps');
const { state } = require('src/config');

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

module.exports = {
  newRound,
  isOpen,
};
