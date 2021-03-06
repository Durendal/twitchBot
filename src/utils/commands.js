import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { client } from 'src/utils/client';
import "regenerator-runtime/runtime";

/**
  Object containing all commands for the bot.
 */
const commands = {};
const mod = {};

const loadCommands = async() => {
  try {
    const base_dir = __dirname.split('/').slice(0, -1).join('/');
    const dirs = readdirSync(`${base_dir}/state/ducks/`).filter(f => statSync(join(`${base_dir}/state/ducks/`, f)).isDirectory());

    dirs.forEach(async dir => {
      mod[dir] = await import(`${base_dir}/state/ducks/${dir}/commands`);
      Object.keys(mod[dir])
        .forEach(m => {
          if(m !== dir) add(m, mod[dir][m])
        });
    });
  } catch (error) {
    console.log(error);
  }
}

const reloadCommands = async() => {
  Object.keys(commands)
    .forEach(command => commands[command] = null);
  await loadCommands();
}

try {
  loadCommands();
} catch (error) {
  console.log(error);
}
/**
  Add a command to the commands list.
  @param {String} name - The name of the command
  @param {Function} fn - The function to execute when command is issued
 */
const add = (name, fn) => {
  console.log(`Adding: ${name} to command list: `, fn);
  commands[name.toLowerCase()] = fn;
};

const getCommands = (target) => {
  return Object.keys(commands)
    .map(command => `!${command.toLowerCase()}`)
    .join(", ");
};

/**
  List all available commands
 */
const listCommands = (msg, context, target) => {
  client.say(target, `Available commands: ${getCommands(target)}`);
};

// Add commands to the commands object
add('list', listCommands);

/**
  Execute an issued command
  @param {String} name - The command to execute
  @param {Array} args - Any arguments that need to be passed to the command
 */
const commandSwitch = (name, msg, context, target) => {

  if (getCommands(target).includes(name)){
    // Trim ! from command
    const short_name = name.substring(1);
    commands[short_name](msg, context, target);
  }
  else
    client.say(target, `Unknown Command: ${name}`);
};

/**
  Notify the user they have entered incorrect parameters to a command

  @param {Integer} arg_length - number of arguments the user entered
  @param {Integer} correct_length - The number of arguments expected by a command
  @param {String} error_message - an error message to send the user
  @param {String} username - the user that messed up
 */
const mismatchParameters = (arg_length, correct_length, error_message, username, target) => {
  client.say(
    target,
    `${username}: Expected ${correct_length} parameters, got ${arg_length}. ${error_message}`
  )
}

export {
  reloadCommands,
  commands,
  commandSwitch,
  add,
  loadCommands,
  mismatchParameters,
};
