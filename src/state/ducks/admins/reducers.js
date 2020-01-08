import * as types from './types';

const initialAdminState = {
  durendalz: {
    durendalz: {
      admin_level: 5,
    },
    chihuahua_charity: {
      admin_level: 3,
    },
    nathanfreeze: {
      admin_level: 3,
    },
  },
  chihuahua_charity: {
    durendalz: {
      admin_level: 3,
    },
    chihuahua_charity: {
      admin_level: 5,
    },
  },
  nathanfreeze: {
    nathanfreeze: {
      admin_level: 5,
    },
    durendalz: {
      admin_level: 3,
    },
  },
};

const adminReducer = (state = initialAdminState, action) => {

  switch(action.type) {
    case types.ADMIN_ADD:
      return {
        ...state,
        [action.payload.channel]: {
          ...state[action.payload.channel],
          [action.payload.username]: {
            admin_level: action.payload.admin_level,
          },
        },
      };

    case types.ADMIN_DEL:
      const admin = Object.keys(state[action.payload.channel])
        .filter(username => {
          return username !== action.payload.username
        })
        .reduce((adm, name) => {
          return {
            ...adm,
            [name]: state[action.payload.channel][name]
          };
        },
        {}
      );
      return {
        ...state,
        [action.payload.channel]: {
          ...admin,
        }
      };

    case types.ADMIN_MOD_LEVEL:
      return {
        ...state,
        [action.payload.channel]: {
          ...state[action.payload.channel],
          [action.payload.username]: {
            admin_level: action.payload.mod_level,
          }
        }
      };

    default:
      return state;
  };
};

export default adminReducer;
