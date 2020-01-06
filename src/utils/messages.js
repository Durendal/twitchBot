import { getUserName } from 'src/utils/users';

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
