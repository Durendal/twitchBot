// Data store for the bot
const state = {
  channels: {
    durendalz: {
      admins: ["chihuahua_charity"],
      polls: [
         {
          map_name: 'langreskaya',
          vote_count: 0,
          voters: []
        },
        {
          map_name: 'crossing in the woods',
          vote_count: 0,
          voters: []
        },
        {
          map_name: 'argentan',
          vote_count: 0,
          voters: []
        },
        {
          map_name: 'carentan',
          vote_count: 0,
          voters: []
        },
      },
    },
    chihuahua_charity: {
      admins: [],
      polls: {},
    }
  },
  logging: true,
};

module.exports = { state };
