import { addLog } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { parseMessage } from 'src/utils/messages';

/**
  Execute when bot receives a message
  @param {String} target - The name of the person joining the channel
  @param {String} msg - The message sent to the bot
 */
const onWhisperHandler = async (target, context, msg, self) => {

  const { username, commandName, args } = parseMessage(msg, context, target);

  if(commandName === '!invite') {
    try {
      const mods = (await client.mods(target));

      if(mods.includes(username)) {
        console.log(`* Invited to ${arg[0]} by ${target} joining...`)
        addLog(`* Invited to ${arg[0]} by ${target} joining...`);
        client.join(arg[0]);
      }
    } catch (error) {
      console.log(error);
    }

  }
};

export {
  onWhisperHandler
};
