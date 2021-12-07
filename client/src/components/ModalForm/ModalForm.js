import { Button, Input, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';

import * as actions from '../../redux/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalForm = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState(data ? data.title : '');
  const [description, setDescription] = React.useState(data ? data.description : '');
  const [isLoading, setLoading] = React.useState(false);

  const onAddPost = async () => {
    try {
      setLoading(true);
      const obj = {
        post: {
          title,
          description,
        },
      };

      if (data) {
        dispatch(actions.updatePost(data._id, obj));
        // await axios.put(`http://localhost:5000/posts/${data._id}`, obj);
        handleClose();
      } else {
        dispatch(actions.createPost(obj));
        // await axios.post('http://localhost:5000/posts', obj);
        handleClose();
      }
    } catch (err) {
      console.warn('Create post', err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography variant='h6' sx={{ mb: 3, textAlign: 'center' }}>
          Add new announcement
        </Typography>
        <Input
          sx={{ mb: 3 }}
          // value={title}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          fullWidth
        />
        <Input
          sx={{ mb: 3 }}
          // value={description}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          fullWidth
        />

        <Button
          disabled={isLoading || !title || !description}
          onClick={onAddPost}
          type='submit'
          variant='contained'
          fullWidth>
          {data ? 'Edit' : 'Create'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalForm;
