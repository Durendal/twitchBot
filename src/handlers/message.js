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

  // Ignore if message is not a command or is sent from our bot
  if (self || !(msg.startsWith('!'))) { return; } // Ignore messages from the bot

  // Extract username from context
  const username = getUserName(context);

  var poll_id = '';

  // Parse command out of message
  const commandName = msg.trim().split(" ")[0];

  switch(commandName) {
    case "!vote":
      poll_id = msg.trim().split(" ")[1];
      if(!pollSelectors.pollIsOpen(getState(), poll_id)) {
        logging.addLog(`${username} attempted to vote while voting was closed`, 'error');
        client.client.say(target, `Sorry ${username} Voting is currently closed.`);
        return;
      }
      const map_name = msg.trim().split(" ").slice(2).join(" ");

      const option_id = pollSelectors.getOptionIdByName(getState(), poll_id, map_name);
      logging.addLog(`${username} attempting to vote for ${map_name}`);
      users.castVote(username, map_name, target);
      try{
        dispatch(
          pollOperations.addPollVote(
            poll_id,
            pollSelectors.getOptionIdByName(getState(),poll_id, map_name),
            username,
          )
        );
      } catch (error) {
        console.log(error);
      }

      logging.logMessage(target, `Votes: ${JSON.stringify(state["voters"])}`);
      break;

    case "!listpolls":
      pollSelectors.listPolls(getState())
        .forEach(poll =>
          client.client.say(target, `Pole #${poll.poll_id}: ${poll.poll_name}`)
        );
      break;

    case "!maps":
      const list = mapList().join(', ');
      try {
        const map_list = pollSelectors.getOptionNames(getState(), 0);
        client.client.say(target, `Map list: ${list}`);
        client.client.say(target, `Map list: ${map_list}`);
      } catch (error) {
        console.log(error);
      }
      break;

    case "!clear":
      poll_id = msg.trim().split(" ")[1];
      users.clearVote(username, target);
      break;

    case "!results":
      rounds.viewResults(target);
      break;

    case "!top":
      client.client.say(target, `Top Map: ${maps.topMap()}`);
      client.client.say(target, `Top Map: ${pollSelectors.getTopOption(getState(), 0)}`)
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
      const map_to_add = msg.trim().split(" ").slice(1).join(" ");
      maps.addMap(map_to_add, target, context);
      break;

    case "!delmap":
      const map_to_del = msg.trim().split(" ").slice(1).join(" ");
      maps.delMap(map_to_del, target, context);
      break;

    case "!test":
      try {
        dispatch(adminOperations.addAdminChannel('durendalz', 'nathanfreeze', 5));
        dispatch(pollOperations.addPollOption(0, 'Angoville'));
        dispatch(pollOperations.addPollVote(0, 0, 'durendalz'));
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
