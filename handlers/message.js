const { client, admins, user, logging, maps, rounds } = require('../utils');
const { state } = require('../config');

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

  // Ignore if message is a command or sent from our bot
  if (self || !(msg.startsWith('!'))) { return; } // Ignore messages from the bot

  // Extract username from context
  const username = user.getUserName(context);

  // Parse command out of message
  const commandName = msg.trim().split(" ")[0];
  switch(commandName) {
    case "!vote":
      if(!rounds.isOpen()) {
        client.say(target, `Sorry ${username} Voting is currently closed.`);
        return;
      }
      const map = msg.trim().split(" ").slice(1).join(" ");
      user.castVote(username, map, target);
      logging.logMessage(target, `Votes: ${JSON.stringify(state["voters"])}`);
      break;
    case "!maps":
      const list = maps.mapList().join(', ');
      client.say(target, `Map list: ${list}`);
      break;
    case "!clear":
      user.clearVote(username, target);
      break;
    case "!results":
      rounds.viewResults(target);
      break;
    case "!top":
      client.say(target, `Top Map: ${maps.topMap()}`);
      break;
    case "!context":
      admins.checkContext(target, context);
      break;
    default:
      logging.logMessage(target, `* Unknown command ${commandName}`);
  }
}

module.exports = { onMessageHandler };
