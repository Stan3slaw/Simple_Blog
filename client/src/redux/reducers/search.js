import * as actions from '../actions/actionTypes';

const initialState = {
  search: null,
};
const search = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};

export default search;
