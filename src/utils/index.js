const { isAdmin } = require('./admins');
const { newRound, isOpen } = require('./rounds');
const { logMessage, addLog, logger } = require('./logging');
const { checkMap, mapList } = require('./maps');
const { checkUser, getUserName } = require('./users');
const { client, parseMessage } = require('./client');

module.exports = {
  admins: {
    isAdmin,
  },
  rounds: {
    newRound,
    isOpen
  },
  logging: {
    logMessage,
    addLog,
    logger
  },
  maps: {
    checkMap,
    mapList,
  },
  users: {
    checkUser,
    getUserName
  },
  client: {
    client,
    parseMessage
  }
};
