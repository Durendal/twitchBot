import { botSelectors, botOperations } from 'src/state/ducks/polls';
import { client } from 'src/utils/client';
import { logging } from 'src/utils';
import { parseMessage, getUserName } from 'src/utils/messages';
import store from 'src/state/store';

const { dispatch, getState } = store;

/**
  Change the bot owner
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const changeOwner = (msg, context, target) => {
  try {
    const { isOwner, args } = parseMessage(msg, context, target);
    const owner = args[0];
    dispatch(botOperations.changeOwner(owner));
  } catch (error) {
    console.log(error);
  }
};

export {
  changeOwner,
}
