import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { client } from 'src/utils/client';
import { parseMessage } from 'src/utils/messages';
import "regenerator-runtime/runtime";

/**
  Object containing all commands for the bot.
 */
const commands = {};
const mod = {};
const list = {};
const blocked = JSON.parse(process.env.BLOCK_MODULES);

const loadCommands = async() => {

  try {
    const base_dir = __dirname.split('/').slice(0, -1).join('/');
    const dirs = readdirSync(`${base_dir}/state/ducks/`).filter(f => statSync(join(`${base_dir}/state/ducks/`, f)).isDirectory());

    dirs.forEach(async dir => {
      if(blocked.includes(dir)) return;
      mod[dir] = await import(`${base_dir}/state/ducks/${dir}/commands`);
      list[dir] = [];
      Object.keys(mod[dir])
        .forEach(m => {
          if(m !== dir) {
            list[dir].push(m);
            add(m, mod[dir][m]);
          }
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
  var response = '';
  const { args } = parseMessage(msg, context, target, 1, '!list <module>');
  const mod = args[0];

  // List modules
  if(mod === 'modules') {
    client.say(target, `Available Modules: ${Object.keys(list).join(", ")}`);
    return;
  }

  // List commands within a given module
  list[mod]
    .forEach(command => {
      response += `!${command.toLowerCase()}, `;
    });

  response = response.substring(0, response.length - 1);
  client.say(target, `Available ${mod} commands: ${response}`);
};

// Add commands to the commands object
add('list', listCommands);

/**
  Execute an issued command
  @param {String} name - The command to execute
  @param {Array} args - Any arguments that need to be passed to the command
 */
const commandSwitch = (name, msg, context, target) => {

  // Trim ! from command
  const short_name = name.substring(1);
  console.log(`${JSON.stringify(list)} in ${JSON.stringify(blocked)} === ${blocked.includes(short_name)}`);
  if(blocked.includes(short_name)){
    client.say(target, `${short_name} module has been disabled`);
    return;
  }

  if (getCommands(target).includes(name)){
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
  list,
};
