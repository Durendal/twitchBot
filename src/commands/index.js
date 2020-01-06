import * as admins from 'src/commands/admins';
import * as polls from 'src/commands/polls';

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
   commands[name] = fn;
};

/**
  Execute an issued command
  @param {String} name - The command to execute
  @param {Array} args - Any arguments that need to be passed to the command
 */
const commandSwitch = (name, ...args) => {
  if (listCommands.includes(name))
    commands[name](...args);
  else
    client.say(target, `Unknown Command: ${name}`);
};

/**
  List all available commands
 */
const listCommands = (target) => {
  const commands = Object.keys(commands).join(", ");
  client.say(target, `Available commands: ${commands}`);
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

export {
  admins,
  polls,
  commands,
  commandSwitch,
  listCommands,
  add
};
