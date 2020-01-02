import tmi from 'tmi.js';
import { client as config } from 'src/config';

const client = new tmi.client(config);

/**
  Parse user output out of a sent message
  @param {String} msg - The message to parse
 */
function parseMessage(msg) {
  return msg.trim().split(" ").slice(1).join(" ");
}

export {
  client,
  parseMessage,
};
