const winston = require('winston');
const { state } = require('src/config');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

function logMessage(target, message) {
  console.log(`${target}: ${message}`);
  addLog(`${target}: ${message}`, 'info');
}

function addLog(message, level = 'info') {
  if(state['logging'])
    logger.log({
      level,
      message
    });
}

module.exports = {
  logMessage,
  addLog,
  logger,
}
