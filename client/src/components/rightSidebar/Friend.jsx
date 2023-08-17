import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { Avatar, Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'

const Friend = () => {
  const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

  const handleClick = async(key) => {
    setOpen(false)
    await dispatch(addRemoveUser(key))
    dispatch(toFollow())
    dispatch(LoadUser())
  }

  const handleClose = () => {
    setOpen(false);
  }

  const {following} = useSelector((state)=> state.user.user)
  return (
    
    <Box m={3} maxHeight={'220px'} className='bg-orange-200'>
        <Typography variant='h5'>Following</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {following && following.length>0 ? (following.map((f)=> (
          <Stack direction={'row'} spacing={2} m={2} alignItems={'center'} key={f._id}>
              <UserImage image = {f.avatar} firstName = {f.firstName} />
              <Typography variant='h6' sx={{width:'70%'}}>{f.firstName} {f.lastName}</Typography>
              <Button variant='text' size='small' color='info' onClick={() => setOpen(!open)}>Following</Button>

              <Modal open={open} onClose={handleClose}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
                <Stack direction={'column'} alignItems={'center'} spacing={2}>
                  <Avatar src = {`http://localhost:8800/assets/${f.avatar}`} sx={{width: 80, height: 80 }} alt = {f.firstName} />
                  <Typography variant='h6'>Are you sure, you want to unfollow {f.firstName}?</Typography>

                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='error' onClick={() => handleClick(f._id)}>Unfollow</Button>
                  <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                  <Button variant='text' color='secondary' onClick={()=> setOpen(!open)}>Cancle</Button>
                </Stack>
              </Box>
              </Modal>
            </Stack>
        ))):(
          <Typography align='center' m={2} variant='h6'>No followings yet!</Typography>
          )}
        </Box>
    </Box>
  )
}

export default Friend
