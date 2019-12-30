const { client } = require('../utils').client;
const { mapList } = require('/Users/durendal/Desktop/twitch_bot/utils').maps;
const { state } = require('../config');

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
