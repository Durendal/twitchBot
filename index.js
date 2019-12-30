require('app-module-path').addPath(__dirname);
const { client } = require('src/utils').client;
const { onMessageHandler, onConnectedHandler } = require('src/handlers');

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
