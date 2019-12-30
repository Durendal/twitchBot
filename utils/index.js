const { isAdmin, checkContext, addMod, delMod, listMods } = require('./admins');
const { viewResults, newRound, isOpen } = require('./rounds');
const { logMessage, addLog, logger } = require('./logging');
const { topMap, checkMap, mapList, addMap, delMap } = require('./maps');
const { checkUser, castVote, clearVote, getUserName } = require('./user');
const { client, parseMessage } = require('./client');

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
    logMessage,
    addLog,
    logger
  },
  maps: {
    topMap,
    checkMap,
    mapList,
    addMap,
    delMap
  },
  user: {
    checkUser,
    castVote,
    clearVote,
    getUserName
  },
  client: {
    client,
    parseMessage
  }
};
