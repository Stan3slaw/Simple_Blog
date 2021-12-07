import { SET_POST_FAIL, SET_POST_START, SET_POST_SUCCESS } from '../actions/actionTypes';

const initialState = {
  post: { title: '', description: '' },
  error: null,
  loading: false,
};

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST_START:
      return { ...state, loading: true };
    case SET_POST_SUCCESS:
      return { ...state, post: action.payload, loading: false, error: false };
    case SET_POST_FAIL:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default createPostReducer;
