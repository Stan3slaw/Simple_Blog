import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid, Typography } from '@mui/material';

import * as actions from '../../../redux/actions';
import ModalForm from '../../ModalForm/ModalForm';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledLink = styled(Link)({
  outline: 'none',
  textDecoration: 'none',
  color: 'inherit',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
});

const CardBox = ({ post }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 2 }} variant='h5' component='h2'>
            {post.title}
          </Typography>
          <Typography>{post.description}</Typography>
        </CardContent>
        <CardActions>
          <StyledLink exact to={`/posts/${post._id}`}>
            <Button size='small'>View</Button>
          </StyledLink>
          <Button onClick={() => setOpen(true)} size='small'>
            Edit
          </Button>
          <ModalForm open={open} handleClose={handleClose} data={post} />
          <Button onClick={() => dispatch(actions.deletePost(post._id))} size='small' color='error'>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardBox;
