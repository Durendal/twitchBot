const { state } = require('src/config');
const { client } = require('src/utils/client');

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
  checkMap,
  mapList,
};
