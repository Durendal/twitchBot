const { isAdmin, checkContext } = require('./admins');
const { viewResults, newRound, isOpen } = require('./rounds');
const { logMessage } = require('./logging');
const { topMap, checkMap, mapList } = require('./maps');
const { checkUser, castVote, clearVote, getUserName } = require('./user');
const { client } = require('./client');

module.exports = {
  admins: {
    isAdmin,
    checkContext,
    addMod,
    delMod,
    listMods
  },
  rounds: {
    viewResults,
    newRound,
    isOpen
  },
  logging: {
    logMessage
  },
  maps: {
    topMap,
    checkMap,
    mapList
  },
  user: {
    checkUser,
    castVote,
    clearVote,
    getUserName
  },
  client
};
