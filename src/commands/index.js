import * as admins from 'src/commands/admins';
import * as polls from 'src/commands/polls';
import { client } from 'src/utils/client';

/**
  Object containing all commands for the bot.
 */
const commands = {};

/**
  Add a command to the commands list.
  @param {String} name - The name of the command
  @param {Function} fn - The function to execute when command is issued
 */
const add = (name, fn) => {
  console.log(`Adding: ${name} to command list: `, fn);
  commands[name.toLowerCase()] = fn;
};

/**
  List all available commands
 */
const listCommands = (target) => {
  const command_list = Object.keys(commands)
    .map(command => `!${command.toLowerCase()}`)
    .join(", ");
  //client.say(target, `Available commands: ${command_list}`);
  return command_list;
};

// Add commands to the commands object
add('list', listCommands);

Object.keys(polls)
  .forEach(poll => {
    add(poll, polls[poll]);
  });

Object.keys(admins)
  .forEach(admin => {
    add(admin, admins[admin]);
  });

/**
  Execute an issued command
  @param {String} name - The command to execute
  @param {Array} args - Any arguments that need to be passed to the command
 */
const commandSwitch = (name, msg, context, target) => {
  if (listCommands(target).includes(name)){
    // Trim ! from command
    const short_name = name.substring(1);
    commands[short_name](msg, context, target);
  }
  else
    client.say(target, `Unknown Command: ${name}`);
};

export {
  admins,
  polls,
  commands,
  commandSwitch,
  add,
};
