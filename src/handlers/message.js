const { client, logging } = require('src/utils');
const { state } = require('src/config');
const { users, admins, maps, rounds } = require('src/commands');
const { getUserName } = require('src/utils').users;
const { isOpen } = require('src/utils').rounds;
const { mapList } = require('src/utils').maps;

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

  // Ignore if message is a command or sent from our bot
  if (self || !(msg.startsWith('!'))) { return; } // Ignore messages from the bot

  // Extract username from context
  const username = getUserName(context);
  var usern = '';
  var map = '';

  // Parse command out of message
  const commandName = msg.trim().split(" ")[0];
  switch(commandName) {
    case "!vote":
      if(!isOpen()) {
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
      client.client.say(target, `Map list: ${list}`);
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
    case "!addmod":
      usern = msg.trim().split(" ").slice(1).join(" ");
      admins.addMod(usern, context);
      break;
    case "!delmod":
      usern = msg.trim().split(" ").slice(1).join(" ");
      admins.delMod(usern, context);
      break;
    case "!listmods":
      admins.listMods(target, context);
      break;
    case "!addmap":
      map = msg.trim().split(" ").slice(1).join(" ");
      maps.addMap(map, context);
      break;
    case "!delmap":
      map = msg.trim().split(" ").slice(1).join(" ");
      maps.delMap(map, context);
      break;
    default:
      logging.logMessage(target, `* Unknown command ${commandName}`);
  }
}

module.exports = { onMessageHandler };
