const { checkContext, checkState, addMod, delMod, listMods } = require('src/commands/admins');
const { topMap, addMap, delMap } = require('src/commands/maps');
const { viewResults } = require('src/commands/rounds');
const { castVote, clearVote } = require('src/commands/users');

module.exports = {
  admins: {
    checkContext,
    checkState,
    addMod,
    delMod,
    listMods,
  },
  maps: {
    topMap,
    addMap,
    delMap,
  },
  rounds: {
    viewResults,
  },
  users: {
    castVote,
    clearVote,
  }
};
