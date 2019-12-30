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
  return Math.ceil(Math.random() * 10) % 2 == 0;
}

module.exports = {
  newRound,
  isOpen,
};
