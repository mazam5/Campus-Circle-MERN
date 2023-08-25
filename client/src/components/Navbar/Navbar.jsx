import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../Actions/User';
import { AppBar, Box, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import UserImage from '../utils/UserImage';

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const dispatch = useDispatch();

  const handleLogout = async() => {
    dispatch(Logout())
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {user} = useSelector((state)=>state.user)
  return (
    <>
  <AppBar position={'sticky'} className='text-white p-4 px-10'>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Box className='w-[20%]'>
        <Typography variant='h6'>Campus Circle</Typography>
      </Box>
      <Box className='w-[40%]'>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/notification">Notification</Link>
    
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserImage image = {user.avatar} width={40} height={40} firstName={user.firstName} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              <Link to={'/account'}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              </Link>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>          
        </Stack>
      </Box>
      </Stack>
    </AppBar>
    </>
  )
}

export default Navbar