import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import UserImage from '../utils/UserImage'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { getFeed } from '../../Actions/Post'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';


const Like = ({ownerAvatar, ownerName, friendId}) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
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
    <Stack direction={'row'} sx={{m:{xs:0, md:2}}} spacing={2} alignItems={'center'}> 
        <UserImage image={ownerAvatar} firstName={ownerName}/>
        <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
          <Link to={`/user/${friendId}`}>
            <Typography>{ownerName}</Typography>
          </Link>

          <Button variant='contained' size={isSmallScreen ? 'small' : 'medium'} sx={{display : isFriend || friendId===user._id ?'none':'block'}} onClick={handleRequest}>Follow</Button>
        </Stack>
    </Stack>
  )
}

export default Like