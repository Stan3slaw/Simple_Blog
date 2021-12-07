import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';

import AppBar from '@mui/material/AppBar';
import { alpha, styled } from '@mui/system';
import { Button, InputBase } from '@mui/material';

import { TextSnippet as Logo } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import ModalForm from '../ModalForm/ModalForm';

import * as actions from '../../redux/actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledLink = styled(Link)({
  outline: 'none',
  textDecoration: 'none',
  color: 'inherit',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
});

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <AppBar position='relative'>
      <Toolbar>
        <StyledLink to='/'>
          <Logo sx={{ mr: 4 }} />
        </StyledLink>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          Announcement Website
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type='text'
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button
          onClick={() => dispatch(actions.setSearch(searchValue))}
          sx={{ ml: 2 }}
          variant='contained'
          color='secondary'>
          <SearchIcon />
        </Button>
        <Button onClick={() => setOpen(true)} sx={{ ml: 4 }} variant='contained' color='secondary'>
          Add new announcement
        </Button>
        <ModalForm open={open} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
