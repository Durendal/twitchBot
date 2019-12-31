const { state } = require('src/config');
const { mapList } = require('src/utils').maps;
const { isAdmin } = require('src/utils').admins;
const { getUserName } = require('src/utils').users;
const { addLog } = require('src/utils').logging;

/**
  Write the current highest voted map to twitch
 */
function topMap() {
  const result = mapList()
    .reduce((a, b) => state['maps'][a] > state['maps'][b] ? a : b);
  return state['maps'][result] === 0 ? "None" : result;
}

/**
  Add a new map to the voting pool
  @param {String} map - The map name to add
  @param {String} target - The twitch channel to add a map in
  @param {Object} context - The context of the user trying to add the map
 */
function addMap(map, target, context) {
  if(!isAdmin(target, context))
    return;
  state['maps'][map] = 0

  // If we are re-adding a previously removed map
  // We want to remove it from winningMaps too
  if(state['winningMaps'].includes(map)) {
    const index = array.indexOf(5);

    if (index > -1)
      state['winningMaps'].splice(index, 1);
  }
}

/**
  Remove a map from voting pool
  @param {String} map - The map name to remove
  @param {String} target - The twitch channel to remove a map from
  @param {Object} context - The context of the user trying to remove the map
 */
function delMap(map, target, context) {
  if(!isAdmin(target, context))
    return;
  delete state['maps'][map];
  Object.keys(state['voters'])
    .forEach(user => {
      if(state['voters'][user] === map) {
        addLog(`${user} being cleared with ${map} `);
        delete state['voters'][user];
      }
    });

}

module.exports = {
  topMap,
  addMap,
  delMap,
};
