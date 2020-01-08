import { addLog } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import store from 'src/state/store';
const { dispatch } = store;

/**
  When a bot joins a channel, add the channels moderators to the admin list
  @param {String} channel - The channel the bot is joining
  @param {String} username - The name of the person joining the channel
 */
const onJoinHandler = async (channel, username) => {
  // Only execute when our bot joins a channel, ignore everyone else.
  if(client.getUsername() === username) {
    const mods = (await client.mods(channel))
      .forEach(mod => {
        dispatch(adminOperations.addAdmin(mod, channel, 4));
      });
  }
};

export {
  onJoinHandler
};
