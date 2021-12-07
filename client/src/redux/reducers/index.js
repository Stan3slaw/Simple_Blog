import { combineReducers } from 'redux';
import createPostReducer from './createPostReducer';
import postReducer from './postReducer';
import search from './search';

const rootReducer = combineReducers({
  post: postReducer,
  createPost: createPostReducer,
  search: search,
});

export default rootReducer;
