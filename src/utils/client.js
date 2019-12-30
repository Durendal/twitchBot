const tmi = require('tmi.js');
const { client } = require('src/config');

const twitch = new tmi.client(client);

function parseMessage(msg) {
  return msg.trim().split(" ").slice(1).join(" ");
}
module.exports = {
  client: twitch,
  parseMessage,
};
