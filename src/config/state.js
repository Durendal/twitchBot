// Data store for the bot
const state = {
  voters: {},
  players: {},
  admins: ["chihuahua_charity"],
  maps: {
    'langreskaya': 0,
    'crossing in the woods': 0,
    'argentan': 0,
    'carentan': 0
  },
  round: 1,
  winningMaps: [],
  logging: true,
};

module.exports = { state };
