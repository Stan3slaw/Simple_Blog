import * as actions from './actionTypes';

export const setSearch = (search) => ({
  type: actions.SET_SEARCH,
  payload: search,
});
