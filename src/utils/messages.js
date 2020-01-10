import { adminSelectors } from 'src/state/ducks/admins';
import { botSelectors } from 'src/state/ducks/bots';
import { mismatchParameters } from 'src/utils/commands';
import store from 'src/state/store';

const { getState } = store;

/**
  parse a message returning data about it
  @param {String} msg - The message sent by the user
  @param {Object} context - The context of the message being sent
 */
const parseMessage = (msg, context, target, params=0, errmsg='') => {

  const username = getUserName(context);
  const commandName = msg.trim().split(" ")[0];
  const args = msg.trim().split(" ").slice(1);
  if(args.length < params) {
   mismatchParameters(
     args.length,
     params,
     errmsg,
     username,
     target
   );
   throw new Error('Incorrect parameters');
  }
  const isAdmin = adminSelectors.isAdmin(getState(), username, target);
  const isOwner = botSelectors.isOwner(getState(), username);
  return {
    username,
    commandName,
    args,
    isAdmin,
  };
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
