import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, RemoveUserFromFollowers, addRemoveUser } from '../../Actions/User'
import { Avatar, Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'
import { Link } from 'react-router-dom'

const Follow = ({isUser, avatar, firstName, lastName, id}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const isFriend = user.following.find((friend) => friend._id.toString() === id.toString());
    
    const handleClick = async (id) => {
      await dispatch(RemoveUserFromFollowers(id));
        dispatch(LoadUser())
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
  
    const handleFollow = async () => {
      await dispatch(addRemoveUser(id));
      handleModalClose();
      dispatch(LoadUser())
    };
  
  return (
    <>
    {isUser ? (
      <Stack direction={'row'} spacing={2} m={2} alignItems={'center'} >
      <UserImage image = {avatar} firstName = {firstName} />
      <Box width={'100%'}>
        <Link to={`/user/${id}`}>
          <Typography variant='h6' sx={{width:'100%'}}>{firstName} {lastName}</Typography>
        </Link>
      </Box>
      {id !== user._id ? (
          isFriend ? (
            <Button variant='text' size='small' color='info' onClick={() => setModalOpen(!modalOpen)}>
              Following
            </Button>
          ) : (
            <Button variant='text' size='small' color='info' onClick={handleFollow}>
              Follow
            </Button>
          )
        ) : null}

          <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
            <Stack direction={'column'} alignItems={'center'} spacing={2}>
              <Avatar src = {`http://localhost:8800/assets/${avatar}`} sx={{width: 80, height: 80 }} alt = {firstName} />
              <Typography variant='h6'>Are you sure, you want to unfollow {firstName}</Typography>

              <Divider variant="middle" sx={{width:'80%',color:"black"}} />
              <Button variant='text' color='error' onClick={() => handleFollow()}>Unfollow</Button>
              <Divider variant="middle" sx={{width:'80%',color:"black"}} />
              <Button variant='text' color='secondary' onClick={()=> setModalOpen(!modalOpen)}>Cancle</Button>
            </Stack>
          </Box>
          </Modal>
        </Stack>
      ):(
        
        <Stack direction={'row'} spacing={2} m={2} alignItems={'center'} >
          <UserImage image = {avatar} firstName = {firstName} />
          <Box width={'100%'}>
                <Link to={`/user/${id}`}>
                  <Typography variant='h6' sx={{width:'100%'}}>{firstName} {lastName}</Typography>
                </Link>
              </Box>
              <Button variant='text' size='small' color='info' onClick={() => setModalOpen(!modalOpen)}>Remove</Button>
              
              
              <Modal open={modalOpen} onClose={handleModalClose}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
                <Stack direction={'column'} alignItems={'center'} spacing={2}>
                  <Avatar src = {`http://localhost:8800/assets/${avatar}`} sx={{width: 80, height: 80 }} alt = {firstName} />
                  <Typography variant='h6'>Are you sure, you want to remove {firstName} as a follower?</Typography>

                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='error' onClick={() => handleClick(id)}>Remove</Button>
                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='secondary' onClick={()=> setModalOpen(!modalOpen)}>Cancle</Button>
                </Stack>
              </Box>
              </Modal>
            </Stack>
            )}
            </>
            )
}

export default Follow