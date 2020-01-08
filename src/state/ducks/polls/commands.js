import { pollSelectors, pollOperations } from 'src/state/ducks/polls';
import { client } from 'src/utils/client';
import { logging } from 'src/utils';
import { parseMessage, getUserName } from 'src/utils/messages';
import store from 'src/state/store';

const { dispatch, getState } = store;

/**
  Cast a vote on a specified poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const vote = (msg, context, target) => {
  const { username, args } = parseMessage(msg, context, target);

  const poll_id = args[0];

  if(!pollSelectors.pollIsOpen(getState(), poll_id, target)) {
    logging.addLog(`${username} attempted to vote while voting was closed`, 'error');
    client.say(target, `Sorry ${username} Voting is currently closed.`);
    return;
  }

  if(pollSelectors.pollExists(getState(), poll_id, target)) {
    const option_name = args.slice(1).join(" ");
    const option_id = pollSelectors.getOptionIdByName(getState(), poll_id, option_name, target);

    logging.addLog(`${username} attempting to vote for ${option_name} ID: ${option_id}`);
    if(!pollSelectors.hasUserVoted(getState(), poll_id, username, target)) {
      try{
        dispatch(
          pollOperations
            .addPollVote(
              poll_id,
              option_id,
              username,
              target,
            )
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      client.say(
        target,
        `User: ${username} has already voted on poll: ${poll_id}`,
      );
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
    pollSelectors.listPolls(getState(), target)
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
  const { args } = parseMessage(msg, context, target);
  const poll_id = args[0];
  try {
    const option_list = pollSelectors.getOptionNames(getState(), poll_id, target);
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
  const { username, args } = parseMessage(msg, context, target);
  const poll_id = args[0];
  try {
    const results = pollSelectors.getResults(getState(), poll_id, target);
    client.say(target, `Poll Results: ${results}`);
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
  const { args, username } = parseMessage(msg, context, target);
  const poll_id = args[0];
  const option_id = pollSelectors.getUserVoteID(getState(), poll_id, username, target);
  dispatch(pollOperations.delPollVote(poll_id, option_id, username, target));
};

/**
  Return the highest voted option of a given poll
  @param {String} msg - The message passed from twitch chat
  @param {Object} context - The user context of the message sender
  @param {String} target - The target source/destination of msg
 */
const topOption = (msg, context, target) => {
  const { args } = parseMessage(msg, context, target);
  const poll_id = args[0];
  try {
    const top_option = pollSelectors.getTopOption(getState(), poll_id, target);
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
  listResults
};
