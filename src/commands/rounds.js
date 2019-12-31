const { client } = require('src/utils').client;
const { mapList } = require('src/utils').maps;
const { state } = require('src/config');

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

module.exports = {
  viewResults,
}
