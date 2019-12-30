const { isAdmin } = require('src/utils/admins');
const { newRound, isOpen } = require('src/utils/rounds');
const { logMessage, addLog, logger } = require('src/utils/logging');
const { checkMap, mapList } = require('src/utils/maps');
const { checkUser, getUserName } = require('src/utils/users');
const { client, parseMessage } = require('src/utils/client');

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
