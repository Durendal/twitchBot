import { logging } from 'src/utils';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import { pollOperations, pollSelectors } from 'src/state/ducks/polls';
import store from 'src/state/store';
import { parseMessage } from 'src/utils/messages';
import { commandSwitch } from 'src/utils/commands';

const { getState, dispatch } = store;

/**
  Execute every time a message comes in
  @param {String} target - The channel the message was received in
  @param {Object} context - The context of the user who sent the message
  @param {String} msg - The message sent by the user
  @param {Object} self - Our bot
 */
const onMessageHandler = async (target, context, msg, self) => {

  // Ignore if message is not a command or is sent from our bot
  if (self || !(msg.startsWith('!'))) { return; }
  try {
    // Extract command
    const { commandName } = parseMessage(msg, context, target);

    // Execute command
    commandSwitch(commandName, msg, context, target);
  } catch (error) {
    console.log(error);
  }
}

export {
  onMessageHandler,
};
