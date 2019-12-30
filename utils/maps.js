const { state } = require('../config');
const { client } = require('./client');

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

module.exports = {
  topMap,
  checkMap,
  mapList
};
