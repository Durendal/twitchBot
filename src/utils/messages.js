import { adminSelectors } from 'src/state/ducks/admins';
import store from 'src/state/store';

const { getState } = store;

/**
  parse a message returning data about it
  @param {String} msg - The message sent by the user
  @param {Object} context - The context of the message being sent
 */
const parseMessage = (msg, context, target) => {
  try {
    const username = getUserName(context);
    const commandName = msg.trim().split(" ")[0];
    const args = msg.trim().split(" ").slice(1);
    const isAdmin = adminSelectors.isAdmin(getState(), username, target);

    return {
      username,
      commandName,
      args,
      isAdmin,
    };
  } catch (error) {
    console.log(error);
  }
};

/**
  Return the username from a given user context
  @param {Object} context - The user context to extract a username from
 */
function getUserName(context) {
  return context['username'] || context['display-name'];
}

export {
  parseMessage,
  getUserName,
};
