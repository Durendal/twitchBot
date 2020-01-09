import { addLog } from 'src/utils/logging';

/**
  Execute this anytime the bot connects
  @param {String} addr - The Address connected to
  @param {Integer} port - The port connected to
 */
function onConnectedHandler (addr, port) {
  addLog(`* Connected to ${addr}:${port}`);
}

export {
  onConnectedHandler
};
