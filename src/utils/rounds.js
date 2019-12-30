const { isAdmin } = require('src/utils/admins');
const { topMap } = require('src/utils/maps');
const { state } = require('src/config');
const { client } = require('src/utils/client');

function newRound(sender) {
  if(!isAdmin(sender))
    return;
  // Remove winning map from the voting pool
  const winner = topMap();
  delete state['maps'][winner];
  state['winningMaps'].append(winner);
}

function isOpen() {
  // Uncomment below line while testing to simulate times when voting is closed
  //return Math.ceil(Math.random() * 10) % 2 == 0;
  return true;
}

module.exports = {
  newRound,
  isOpen,
};
