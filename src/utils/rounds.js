const { isAdmin } = require('./admins');
const { topMap } = require('./maps');
const { state } = require('../config');
const { client } = require('./client');

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
