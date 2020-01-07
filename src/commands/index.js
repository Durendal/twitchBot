const { readdirSync, statSync } = require('fs');
const { join } = require('path');
import { client } from 'src/utils/client';
import "regenerator-runtime/runtime";

/**
  Object containing all commands for the bot.
 */
const commands = {};

const loadCommands = async() => {
  try {
    const base_dir = __dirname.split('/').slice(0, -1).join('/');
    const dirs = readdirSync(`${base_dir}/state/ducks/`).filter(f => statSync(join(`${base_dir}/state/ducks/`, f)).isDirectory());

    dirs.forEach(async dir => {
      commands[dir] = await import(`${base_dir}/state/ducks/${dir}/commands`);
      Object.keys(commands[dir])
        .forEach(command => add(command, commands[dir][command]));
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

/**
  List all available commands
 */
const listCommands = (target) => {
  const command_list = Object.keys(commands)
    .map(command => `!${command.toLowerCase()}`)
    .join(", ");
  client.say(target, `Available commands: ${command_list}`);
  return command_list;
};

// Add commands to the commands object
add('list', listCommands);

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
  reloadCommands,
  commands,
  commandSwitch,
  add,
  loadCommands,
};
