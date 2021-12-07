import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';

import Cards from '../components/Cards/Cards';

import * as actions from '../redux/actions';

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(({ post }) => post.items);
  const search = useSelector(({ search }) => search.search);
  console.log(search);
  React.useEffect(() => {
    dispatch(actions.getPosts(search));
  }, [dispatch, search]);
  return (
    <>
      <Paper elevation={0}>
        <Cards items={posts} />
      </Paper>
    </>
  );
}
