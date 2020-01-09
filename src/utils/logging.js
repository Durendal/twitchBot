import winston from 'winston';

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' })
  ]
});

// If in production, add console logging
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

/**
  Write a message to console.log as well as make an 'info' entry in info.log
  @param {String} target - The channel of the message being logged
  @param {String} message - The message to log
 */
function logMessage(target, message) {
  console.log(`${target}: ${message}`);
  addLog(`${target}: ${message}`, 'info');
}

/**
  Write a message to the log
  @param {String} message - The message to write to the log
  @param {String} level - The log level for the message
 */
function addLog(message, level = 'info') {
    logger.log({
      level,
      message
    });
}

export {
  logMessage,
  addLog,
  logger,
}
