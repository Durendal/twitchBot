const { client } = require('./utils');
const { onMessageHandler, onConnectedHandler } = require('./handlers');

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
