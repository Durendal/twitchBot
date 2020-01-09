import * as types from './types';

const addAdmin = payload => ({
  type: types.ADMIN_ADD,
  payload,
});

const delAdmin = payload => ({
  type: types.ADMIN_DEL,
  payload,
});

const modAdminLevel = payload => ({
  type: types.ADMIN_MOD_LEVEL,
  payload,
});

const addAdminChannel = payload => ({
  type: types.ADMIN_ADD_CHANNEL,
  payload,
});

const delAdminChannel = payload => ({
  type: types.ADMIN_DEL_CHANNEL,
  payload,
});

export {
  addAdmin,
  delAdmin,
  modAdminLevel,
  addAdminChannel,
  delAdminChannel,
};
