import tmi from 'tmi.js';
import { client as config } from 'src/config';

const client = new tmi.client(config);

export {
  client,
};
