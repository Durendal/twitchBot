import { getUserName } from 'src/utils/users';
import { adminSelectors } from 'src/state/ducks/admins';
import { getState } from 'src/state/store';

/**
  parse a message returning data about it
  @param {String} msg - The message sent by the user
  @param {Object} context - The context of the message being sent
 */
const parseMessage = (msg, context, target) => {
  const username = getUserName(context);
  const isAdmin = adminSelectors.isAdmin(getState(), username, target);
  const commandName = msg.trim().split(" ")[0];
  const arguments = msg.trim().split().slice(1);

  return {
    username,
    commandName,
    arguments,
    isAdmin,
  };
};

export {
  parseMessage,
};
