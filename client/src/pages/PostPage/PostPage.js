import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardBox from '../../components/Cards/Card/Card';
import * as actions from '../../redux/actions';

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(({ post }) => post.items);

  const [details, setDetails] = React.useState([]);
  const params = useParams();
  React.useEffect(() => {
    dispatch(actions.getPosts());
  }, [dispatch]);

  React.useEffect(() => {
    if (params.id) {
      posts.forEach((post) => {
        if (post._id === params.id) setDetails(post);
      });
    }
  }, [params.id, posts]);
  return (
    <>
      <Paper sx={{ m: '0 auto', p: 4 }} elevation={0}>
        <Box sx={{ my: 4 }}>
          <Typography variant='h5' component='h2'>
            Title:
          </Typography>
          <Typography> {details.title}</Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>Description:</Typography>
          <Typography>{details.description}</Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>Date Added:</Typography>
          <Typography>{details.createdAt}</Typography>
        </Box>
      </Paper>

      <Grid sx={{ p: 4 }} container spacing={4}>
        {details.title &&
          posts
            .map((card) => {
              const matchedTitle = details.title.match(card.title);
              const matchedDescription = details.description.match(card.description);
              if ((matchedTitle || matchedDescription) && card._id !== details._id) {
                return <CardBox key={card._id} post={card} />;
              }
              return null;
            })
            .slice(0, 3)}
      </Grid>
    </>
  );
};

export default PostPage;
