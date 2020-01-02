import "app-module-path/register";
import { client } from 'src/utils/client';
import { onMessageHandler, onConnectedHandler } from 'src/handlers';
import store from 'src/state/store';

// Subscribe to redux store
store.subscribe(() => console.log('Store changed', store.getState()));

// Register our event handlers
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
