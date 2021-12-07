import axios from 'axios';

import * as actions from './actionTypes';

export const getPosts = (search) => async (dispatch) => {
  dispatch({ type: actions.GET_POSTS_START });
  try {
    await axios
      .get(`http://localhost:5000/posts?${search !== null ? `search=${search}` : ''}`)
      .then(({ data }) =>
        dispatch({
          type: actions.GET_POSTS_SUCCESS,
          payload: data.posts,
        }),
      );
  } catch (err) {
    dispatch({ type: actions.GET_POSTS_FAIL, payload: err.message });
  }
};

export const createPost = (obj) => async (dispatch) => {
  dispatch({ type: actions.SET_POST_START });
  try {
    console.log(obj);
    await axios.post('http://localhost:5000/posts', obj).then(({ data }) =>
      dispatch({
        type: actions.SET_POST_SUCCESS,
        payload: data.post,
      }),
    );
    await axios.get('http://localhost:5000/posts').then(({ data }) =>
      dispatch({
        type: actions.GET_POSTS_SUCCESS,
        payload: data.posts,
      }),
    );
  } catch (err) {
    dispatch({ type: actions.SET_POST_FAIL, payload: err.message });
  }
};

export const updatePost = (id, obj) => async (dispatch) => {
  dispatch({ type: actions.SET_POST_START });
  try {
    await axios.put(`http://localhost:5000/posts/${id}`, obj);

    await axios.get('http://localhost:5000/posts').then(({ data }) =>
      dispatch({
        type: actions.GET_POSTS_SUCCESS,
        payload: data.posts,
      }),
    );
  } catch (err) {
    dispatch({ type: actions.SET_POST_FAIL });
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: actions.SET_POST_START });
  try {
    await axios.delete(`http://localhost:5000/posts/${id}`);

    await axios.get('http://localhost:5000/posts').then(({ data }) =>
      dispatch({
        type: actions.GET_POSTS_SUCCESS,
        payload: data.posts,
      }),
    );
  } catch (err) {
    dispatch({ type: actions.SET_POST_FAIL });
  }
};
