import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import UserImage from '../utils/UserImage'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { getFeed } from '../../Actions/Post'
import { Link } from 'react-router-dom'

const Like = ({ownerAvatar, ownerName, friendId}) => {

    const {user} = useSelector((state) => state.user) 
    const isFriend = user.following.find((friend) => friend._id === friendId);

    const dispatch = useDispatch()
    const handleRequest = async() => {
        await dispatch(addRemoveUser(friendId));
        await dispatch(getFeed())
        await dispatch(toFollow())
        dispatch(LoadUser())
      }
  return (
    <Stack direction={'row'} m={2} spacing={2} alignItems={'center'}> 
        <UserImage image={ownerAvatar} firstName={ownerName}/>
        <Box width={'70%'}>
        <Link to={`/user/${friendId}`}>
          <Typography width={'70%'} fontSize={'1.3rem'}>{ownerName}</Typography>
        </Link>
        </Box>

        <Button variant='contained' sx={{display : isFriend || friendId===user._id ?'none':'block'}} onClick={handleRequest}>Follow</Button>
    </Stack>
  )
}

export default Like