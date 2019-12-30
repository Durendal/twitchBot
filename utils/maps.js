const { state } = require('../config');
const { client } = require('./client');
const { getUserName } = require('./user');

function topMap() {
  const result = mapList()
    .reduce((a, b) => state['maps'][a] > state['maps'][b] ? a : b);
  return state['maps'][result] === 0 ? "None" : result;
}

function checkMap(map, target) {
  if(mapList().includes(map)) {
    return true;
  }
  client.say(target, `${map} is not a valid map.`);
  return false;
}

function mapList() {
  return Object.keys(state['maps']);
}

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
}

module.exports = {
  topMap,
  checkMap,
  mapList,
  addMap,
  delMap,
};
