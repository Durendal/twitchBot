# TwitchBot

This is a simple bot for twitch. Being developed for an up-coming company of heroes 2 tournament it will allow viewers to vote on which maps contestants will play on. It's currently a work in progress.

# Install

To install and run twitchBot you must have node installed. This app was developed with node v12.14.0 and npm v6.13.4 and has not been tested outside of that.

Steps:

* `$ git clone https://github.com/Durendal/twitchBot.git`
* `$ cd twitchBot`
* `$ npm install`
* `$ cp src/config/client.js.example src/config/client.js`
* Update `src/config/client.js` with your username, oauth token, and channels you wish to join
* `$ npm run start`


# Modules

## Polls
### !vote \<poll_id\> \<poll_option\>
    Allows a user to submit a vote for <poll option> on <poll id> as long as it is a valid option listed in `!options <poll id>` and the user has no previously recorded vote.
### !listoptions \<poll_id\>
    Prints a list of all options available to vote for on <poll id> to the chat
### !clearvote \<poll_id\>
    If a user has a previously recorded vote on <poll id> it will be cleared.
### !listresults \<poll_id\>
    Prints out a list of each elligible option on <poll id> and its current number of votes.
### !topoption \<poll_id\>
    Prints out the current highest voted option for <poll id>.
### !addpoll \<poll_name\>
    Add a new poll
### !delpoll \<poll_id\>
    Remove a poll
### !addoption \<poll_id\> \<option_name\>
    Add a new option for a given poll
### !deloption \<poll_id\> \<option_name\>
    Remove an option from a given poll
### !pollon \<poll_id\>
    By default newly created polls are inactive, executing this command will open them for voting
### !polloff \<poll_id\>
    To end or pause a poll, execute this command.

## Admins
### !checkcontext
    For debugging, it prints out the tmi.js context associated with a message to the bots console.
### !checkstate
    For debugging, it prints out the current redux store to the bots console.
### !addmod \<username\>
    Adds a new moderator to the list
### !delmod \<username\>
    Removes a moderator from the list
### !listmods
    Lists all moderators
### !join <channel_name>
    Have the bot join a channel
### !part <channel_name>
    Have the bot part a channel

# Planned Improvements:

* ~~Generic votes not just maps~~
* ~~Integration with twitch channel administrators~~
* Better documentation ![Kappa](https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 "Kappa")
* ~~Multi-channel support~~
* eggdrop style random banter and absurdities
* an easter egg or two.
* ~~replace homebrew state system with redux~~

# Creating additional modules

A module is in essence just the types, actions, operations, selectors and reducer for its state. As well as an additional commands.js file which exports functions that are dynamically imported and mapped to commands the bot will respond to. Familiarity with the [Reducks pattern](https://github.com/erikras/ducks-modular-redux) will be very beneficial. Feel free to poke through src/state/ducks/admins and src/state/ducks/polls to get a sense of what is required.

All commands share a common parameter set that includes the message, context, and target channel of the originating message. Using the parseMessage method values such as: username, commandName, args, isAdmin can be extracted and an additional 2 optional parameters can be sent to indicate a required number of parameters and error message for the command. If an invalid number of parameters is sent an exception will be raised and the user will be sent a message. Generally the error message should consist of an example of how to run a command e.g.: `!addmod <username> <admin_level>`
