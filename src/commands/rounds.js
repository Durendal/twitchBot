import { client } from 'src/utils/client';
import { mapList } from 'src/utils/maps';
import { state } from 'src/config';

/**
  View the list of maps and their respective votes for the current round
  @param {String} target - The twitch channel to check for results
 */
function viewResults(target) {
  var results = '';
  mapList()
      .forEach(map => results += `${map}: ${state['maps'][map]}, `
  );
  client.say(target, results);
}

export {
  viewResults,
}
