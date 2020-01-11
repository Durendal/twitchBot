import tmi from 'tmi.js';

const config = {
  debug: process.env.DEBUG,
  connection: {
    reconnect: process.env.CLIENT_RECONNECT,
  },
  identity: {
    username: process.env.IDENTITY_USERNAME,
    password: process.env.IDENTITY_PASSWORD,
  },
  channels: JSON.parse(process.env.CHANNELS)
};

const client = new tmi.client(config);

export {
  client,
};
