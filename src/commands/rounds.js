const { client } = require('src/utils').client;
const { mapList } = require('src/utils').maps;
const { state } = require('src/config');

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
