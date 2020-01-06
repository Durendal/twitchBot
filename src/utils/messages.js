import { getUserName } from 'src/utils/users';

/**
  parse a message returning the username of the sender, the command, and any arguments
  @param {String} msg - The message sent by the user
  @param {Object} context - The context of the message being sent
 */
const parseMessage = (msg, context) => {
  const username = getUserName(context);
  const commandName = msg.trim().split(" ")[0];
  const arguments = msg.trim().split().slice(1);

  return {
    username,
    commandName,
    arguments,
  };
};

export {
  parseMessage,
};
