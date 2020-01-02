import { state } from 'src/config';
import { client } from 'src/utils/client';

/**
  Verify if a map name is in our list of elligible maps
  @param {String} map - The map name to check
  @param {String} target - The channel the map was checked from
  @return {Boolean} - Whether or not the map is valid
 */
function checkMap(map, target) {
  if(mapList().includes(map)) {
    return true;
  }
  client.say(target, `${map} is not a valid map.`);
  return false;
}

/**
  Returns a list of all currently elligible maps to vote on
 */
function mapList() {
  return Object.keys(state['maps']);
}

export {
  checkMap,
  mapList,
};
