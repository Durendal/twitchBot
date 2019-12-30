const { isAdmin } = require('./admins');
const { topMap, mapList } = require('./maps');
const { state } = require('../config');
const { client } = require('./client');

function viewResults(target) {
  var results = '';
  mapList()
      .forEach(map => results += `${map}: ${state['maps'][map]}, `
  );
  client.say(target, results);
}

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
  viewResults,
  newRound,
  isOpen,
};
