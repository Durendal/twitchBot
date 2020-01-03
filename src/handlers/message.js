import { client, logging } from 'src/utils';
import { state } from 'src/config';
import { users, admins, maps, rounds } from 'src/commands';
import { getUserName } from 'src/utils/users';
import { isOpen } from 'src/utils/rounds';
import { mapList } from 'src/utils/maps';
import { adminOperations, adminSelectors } from 'src/state/ducks/admins';
import { pollOperations, pollSelectors } from 'src/state/ducks/polls';
import store from 'src/state/store';
const { getState, dispatch } = store;

/**
  Execute every time a message comes in
  @param {String} target - The channel the message was received in
  @param {Object} context - The context of the user who sent the message
  @param {String} msg - The message sent by the user
  @param {Object} self - Our bot
 */
const onMessageHandler = async (target, context, msg, self) => {

  // Ignore if message is a command or sent from our bot
  if (self || !(msg.startsWith('!'))) { return; } // Ignore messages from the bot

  // Extract username from context
  const username = getUserName(context);
  var usern = '';
  var map = '';
  var poll_id = '';

  // Parse command out of message
  const commandName = msg.trim().split(" ")[0];
  switch(commandName) {
    case "!vote":
      poll_id = msg.trim().split(" ")[1];
      if(!isOpen(poll_id)) {
        logging.addLog(`${username} attempted to vote while voting was closed`, 'error');
        client.client.say(target, `Sorry ${username} Voting is currently closed.`);
        return;
      }
      map = msg.trim().split(" ").slice(1).join(" ");
      logging.addLog(`${username} attempting to vote for ${map}`)
      users.castVote(username, map, target);
      logging.logMessage(target, `Votes: ${JSON.stringify(state["voters"])}`);
      break;
    case "!maps":
      const list = mapList().join(', ');
      const map_list = pollSelectors.getOptionNames(getState(), 0);
      client.client.say(target, `Map list: ${list}`);
      client.client.say(target, `Map list: ${map_list}`);
      break;
    case "!clear":
      users.clearVote(username, target);
      break;
    case "!results":
      rounds.viewResults(target);
      break;
    case "!top":
      client.client.say(target, `Top Map: ${maps.topMap()}`);
      break;
    case "!context":
      admins.checkContext(target, context);
      break;
    case "!state":
      admins.checkState(target, context);
      break;
    case "!addmod":
      const mod_to_add = msg.trim().split(" ").slice(1).join(" ");
      admins.addMod(mod_to_add, target, context);
      break;
    case "!delmod":
      const mod_to_del = msg.trim().split(" ").slice(1).join(" ");
      admins.delMod(mod_to_del, target, context);
      break;
    case "!listmods":
      admins.listMods(target, context);
      break;
    case "!addmap":
      map = msg.trim().split(" ").slice(1).join(" ");
      maps.addMap(map, target, context);
      break;
    case "!delmap":
      map = msg.trim().split(" ").slice(1).join(" ");
      maps.delMap(map, target, context);
      break;
    case "!test":
      try {
        dispatch(adminOperations.addAdminChannel('durendalz', 'nathanfreeze', 5));
        dispatch(pollOperations.addPollOption(0, 'Angoville'));
      } catch (error) {
        console.log(error);
      }
      break;
    case "!print":
      client.client.say(target, JSON.stringify(getState()));
      break;
    default:
      logging.logMessage(target, `* Unknown command ${commandName}`);
  }
}

module.exports = { onMessageHandler };
