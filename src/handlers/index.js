import { onMessageHandler } from 'src/handlers/message';
import { onConnectedHandler } from 'src/handlers/connected';
import { onJoinHandler } from 'src/handlers/join';
import { onWhisperHandler } from 'src/handlers/whisper';

module.exports = {
  onMessageHandler,
  onConnectedHandler,
  onJoinHandler,
  onWhisperHandler,
}
