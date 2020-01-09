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


# Commands

## Polls
### !vote \<poll id\> \<poll option\>
    Allows a user to submit a vote for <poll option> on <poll id> as long as it is a valid option listed in `!options <poll id>` and the user has no previously recorded vote.
### !options \<poll id\>
    Prints a list of all options available to vote for on <poll id> to the chat
### !clear \<poll id\>
    If a user has a previously recorded vote on <poll id> it will be cleared.
### !results \<poll id\>
    Prints out a list of each elligible option on <poll id> and its current number of votes.
### !top \<poll id\>
    Prints out the current highest voted option for <poll id>.

## Admins
### !context
    For debugging, it prints out the tmi.js context associated with a message to the bots console.
### !addmod \<username\>
    Adds a new moderator to the list
### !delmod \<username\>
    Removes a moderator from the list
### !listmods
    Lists all moderators
### !addmap \<map name\>
    Adds a new map to the elligible map list (if its currently in state['winningMaps'] it will be removed)
### !delmap \<map name\>
    Removes a map from the elligible map list

# Planned Improvements:

* Generic votes not just maps
* ~~Integration with twitch channel administrators~~
* Better documentation ![Kappa](https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 "Kappa")
* Multi-channel support
* eggdrop style random banter and absurdities
* an easter egg or two.
* replace homebrew state system with redux
