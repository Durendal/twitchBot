const tmi = require('tmi.js');
const { client } = require('../config');

const twitch = new tmi.client(client);

module.exports = {
  client: twitch
};
