import "app-module-path/register";
import { client } from 'src/utils/client';
import { onMessageHandler, onConnectedHandler } from 'src/handlers';
import store from 'src/state/store';
const { subscribe, getState } = store;

// Subscribe to redux store
subscribe(() => console.log('Store changed', JSON.stringify(getState())));

// Register our event handlers
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
