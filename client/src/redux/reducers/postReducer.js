import { GET_POSTS_FAIL, GET_POSTS_START, GET_POSTS_SUCCESS } from '../actions/actionTypes';

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_START:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return { ...state, items: action.payload, error: false, loading: false };
    case GET_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default postReducer;
