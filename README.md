# TwitchBot

This is a simple bot for twitch. Being developed for an up-coming company of heroes 2 tournament it will allow viewers to vote on which maps contestants will play on. It's currently a work in progress.

# Use

In order to use the bot copy the `client.js.example` file in the `config/` directory to `client.js` and fill in the values for your username, oauth token and channels you wish to join. Then simply run `npm run test` and it should connect to your channels! You can add or modify administrators from within `config/state.js` Cheers!

# Commands

## Users
###!vote <map name>
    Allows a user to submit a vote for <map name> as long as it is a valid map listed in `!maps` and the user has no previously recorded vote.
###!maps
    Prints a list of all maps available to vote for to the chat
###!clear
    If a user has a previously recorded vote it will be cleared.
###!results
    Prints out a list of each elligible map and its current number of votes.
###!top
    Prints out the current highest voted map.

## Admins
###!context
    For debugging, it prints out the tmi.js context associated with a message to the bots console.
###!addmod <username>
    Adds a new moderator to the list
###!delmod <username>
    Removes a moderator from the list
###!listmods
    Lists all moderators
###!addmap <map name>
    Adds a new map to the elligible map list (if its currently in state['winningMaps'] it will be removed)
###!delmap <map name>
    Removes a map from the elligible map list
