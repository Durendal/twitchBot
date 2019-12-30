const { state } = require('../config');

function topMap() {
  const result = mapList()
    .reduce((a, b) => state['maps'][a] > state['maps'][b] ? a : b);
  return state['maps'][result] === 0 ? "None" : result;
}

// For some reason importing getUserName and isAdmin in this file
// doesnt work... manually implement the checks.
function addMap(map, context) {
  if(!(state['admins'].includes(context['username'])))
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
  if(!(state['admins'].includes(context['username'])))
    return;
  delete state['maps'][map];
}

module.exports = {
  topMap,
  addMap,
  delMap,
};
