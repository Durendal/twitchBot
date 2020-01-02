import * as types from './types';

/*
  admin elements:
  {
    admins: [
      durendalz: {
        channels: [],
        adminLevel: 5,
      }
    ]
  }
*/

const initialAdminState = {
  admins: {
    durendalz: {
      channels: {
        durendalz: {
          admin_level: 5,
        },
        chihuahua_charity: {
          admin_level: 3,
        }
      },
    },
    chihuahua_charity: {
      channels: {
        chihuahua_charity: {
          admin_level: 5
        }
      },
    }
  }
};

const adminReducer = (state = initialAdminState, action) => {

  switch(action.type) {
    case types.ADMIN_ADD:
      return {
        ...state,
        admin: {
          ...state.admin,
          [action.payload.username]: {
            channels: {},
          }
        }
      };

    case types.ADMIN_DEL:
      const admin = Object.keys(state.admins)
        .filter(username => username !== action.payload.username)
        .reduce((adm, name) => {
          return {
            ...adm,
            [name]: state.admins[name]
          };
        },
        {}
      );
      return {
        ...state,
        admins: {
          ...admin,
        },
      };
    case types.ADMIN_MOD_LEVEL:
      return {
        ...state,
        admins: {
          ...state.admins,
          [action.payload.username]: {
            ...state.admins[action.payload.username],
            channels: {
              ...state.admins[action.payload.username].channels,
              [action.payload.channel]: {
                admin_level: action.payload.mod_level,
              }
            }
          }
        }
      };
    case types.ADMIN_ADD_CHANNEL:
      return {
        ...state,
        admins: {
          ...state.admins,
          [action.payload.username]: {
            ...state.admins[action.payload.username],
            channels: {
              ...state.admins[action.payload.username].channels,
              [action.payload.channel]: {
                admin_level: action.payload.mod_level,
              }
            }
          }
        }
      };
    case types.ADMIN_DEL_CHANNEL:
      const channels = Object.keys(state.admins[action.payload.username].channels)
        .filter(chan_name => chan_name !== action.payload.channel)
        .reduce((chan, key) => {
            return {
              ...chan,
              [key]: state.admins[action.payload.username].channels[key]
            };
          },
          {}
        );
      return {
        ...state,
        admins: {
          ...state.admins,
          [action.payload.username]: {
            ...state.admins[action.payload.username],
            channels
          }
        }
      };
  };
};

export default adminReducer;
