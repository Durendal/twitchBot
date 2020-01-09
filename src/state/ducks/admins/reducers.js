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

  const { type, payload } = action;

  switch(type) {

    case types.ADMIN_ADD:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          [payload.username]: {
            admin_level: payload.admin_level,
          },
        },
      };

    case types.ADMIN_DEL:
      const admin = Object.keys(state[payload.channel])
        .filter(username => {
          return username !== payload.username
        })
        .reduce((adm, name) => {
          return {
            ...adm,
            [name]: state[payload.channel][name]
          };
        },
        {}
      );
      return {
        ...state,
        [payload.channel]: {
          ...admin,
        }
      };

    case types.ADMIN_MOD_LEVEL:
      return {
        ...state,
        [payload.channel]: {
          ...state[payload.channel],
          [payload.username]: {
            admin_level: payload.mod_level,
          }
        }
      };

    case types.ADMIN_ADD_CHANNEL:
      return {
        ...state,
        [payload.channel]: {
          [payload.channel]: {
            admin_level: 5,
          }
        }
      };

    default:
      return state;
  };
};

export default adminReducer;
