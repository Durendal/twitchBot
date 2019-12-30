const { checkContext, addMod, delMod, listMods } = require('./admins');
const { topMap, addMap, delMap } = require('./maps');
const { viewResults } = require('./rounds');
const { castVote, clearVote } = require('./users');

module.exports = {
  admins: {
    checkContext,
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
