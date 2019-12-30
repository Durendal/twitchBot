const { addLog } = require('../utils/logging');
function onConnectedHandler (addr, port) {
  addLog(`* Connected to ${addr}:${port}`);
}

module.exports = { onConnectedHandler };
