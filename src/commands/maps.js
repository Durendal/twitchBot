const { state } = require('src/config');
const { mapList } = require('src/utils').maps;
const { isAdmin } = require('src/utils').admins;
const { getUserName } = require('src/utils').users;
const { addLog } = require('src/utils').logging;

function topMap() {
  const result = mapList()
    .reduce((a, b) => state['maps'][a] > state['maps'][b] ? a : b);
  return state['maps'][result] === 0 ? "None" : result;
}

// For some reason importing getUserName and isAdmin in this file
// doesnt work... manually implement the checks.
function addMap(map, context) {
  if(!isAdmin(getUserName(context)))
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

function delMap(map, context) {
  if(!isAdmin(getUserName(context)))
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