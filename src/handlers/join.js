import { addLog } from 'src/utils/logging';
import { client } from 'src/utils/client';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import store from 'src/state/store';
const { dispatch, getState } = store;

/**
  When a bot joins a channel, add the channels moderators to the admin list
  @param {String} target - The channel the bot is joining
  @param {String} username - The name of the person joining the channel
  @param {Object} self - Our bot
 */
const onJoinHandler = async (target, username, self) => {

  // Only execute when our bot joins a channel, ignore everyone else.
  if(self) {
    // trim hashtag from channel
    const channel = target.substring(1);

    // Check if the channel being joined exists in the admin state, if not add it.
    if(!adminSelectors.inChannel(getState(), channel))
      try {
        dispatch(adminOperations.addAdminChannel(channel));
      } catch (error) {
        console.log(error);
      }

    // Retrieve a list of twitch moderators from the channel and add them to mod list
    try {
      (await client.mods(channel))
        .forEach(mod => {
          if(!adminSelectors.channelMods(getState(), channel).includes(mod)) {
            dispatch(adminOperations.addAdmin(mod, channel, 4));
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export {
  onJoinHandler
};
