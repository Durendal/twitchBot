import { pollSelectors, pollOperations } from 'src/state/ducks/polls';
import { client } from 'src/utils/client';
import { logging } from 'src/utils';
import { getUserName } from 'src/utils/users';
import { parseMessage } from 'src/utils/messages';
import { dispatch, getState } from 'src/state/store';

/**
  Cast a vote on a specified poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const vote = (msg, context, target) => {
  const { username, arguments } = parseMessage(msg, context);

  const poll_id = arguments[0];

  if(!pollSelectors.pollIsOpen(getState(), poll_id)) {
    logging.addLog(`${username} attempted to vote while voting was closed`, 'error');
    client.say(target, `Sorry ${username} Voting is currently closed.`);
    return;
  }

  if(pollSelectors.pollExists(getState(), poll_id)) {
    const option_name = arguments.slice(1).join(" ");
    const option_id = pollSelectors.getOptionIdByName(getState(), poll_id, map_name);

    logging.addLog(`${username} attempting to vote for ${option_name}`);

    try{
      dispatch(
        pollOperations
          .addPollVote(
            poll_id,
            pollSelectors
              .getOptionIdByName(
                getState(),
                poll_id,
                option_name
              ),
            username,
          )
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    client.say(
      target,
      `Poll: ${poll_id} does not exist. Check !listpolls to see available polls.`
    );
  }
};

/**
  List all polls available
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const listPolls = (msg, context, target) => {
  try {
    pollSelectors.listPolls(getState())
      .forEach(poll =>
        client.say(target, `Poll #${poll.poll_id}: ${poll.poll_name}`)
      );
  } catch (error) {
    console.log(error);
  }
};

/**
  List all options available in a given poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const listOptions = (msg, context, target) => {
  const { arguments } = parseMessage(msg, context);
  const poll_id = arguments[0];
  try {
    const option_list = pollSelectors.getOptionNames(getState(), poll_id);
    client.say(target, `Option list: ${option_list}`);
  } catch (error) {
    console.log(error);
  }
};

/**
  List results of a given poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const listResults = (msg, context, target) => {
  const { username, arguments } = parseMessage(msg, context);
  const poll_id = arguments[0];
  try {
    const results = pollSelectors.getResults(getState(), target, poll_id);
    client.say(target, `Poll Results: ${JSON.stringify(results)}`);
  } catch (error) {
    console.log(error);
  }
};

/**
  Clear users vote for a given poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const clearVote = (msg, context, target) => {
  const { arguments, username } = parseMessage(msg, context);
  const poll_id = arguments[0];
  const option_id = pollSelectors.getUserVoteID(state, poll_id, username);
  pollOperations.delPollVote(poll_id, option_id, username);
};

/**
  Return the highest voted option of a given poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const topOption = (msg, context, target) => {
  const { arguments } = parseMessage(msg, context);
  const poll_id = arguments[0];
  try {
    const top_option = pollSelectors.getTopOption(getState(), poll_id);
    client.say(target, `Highest voted: ${top_option}`);
  } catch (error) {
    console.log(error);
  }
};

export {
  vote,
  listPolls,
  listOptions,
  clearVote,
  topOption,
};
