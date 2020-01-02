import "app-module-path/register";
import { client } from 'src/utils/client';
import { onMessageHandler, onConnectedHandler } from 'src/handlers';

// Register our event handlers
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
