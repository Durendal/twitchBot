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
* `$ npm run test`


# Commands

## Users
### !vote \<map name\>
    Allows a user to submit a vote for <map name> as long as it is a valid map listed in `!maps` and the user has no previously recorded vote.
### !maps
    Prints a list of all maps available to vote for to the chat
### !clear
    If a user has a previously recorded vote it will be cleared.
### !results
    Prints out a list of each elligible map and its current number of votes.
### !top
    Prints out the current highest voted map.

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
* ~~Better documentation Kappa~~
* Multi-channel support
* eggdrop style random banter and absurdities
* an easter egg or two.
* replace homebrew state system with redux
