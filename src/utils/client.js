const tmi = require('tmi.js');
const { client } = require('src/config');

const twitch = new tmi.client(client);

/**
  Parse user output out of a sent message
  @param {String} msg - The message to parse
 */
function parseMessage(msg) {
  return msg.trim().split(" ").slice(1).join(" ");
}

module.exports = {
  client: twitch,
  parseMessage,
};
