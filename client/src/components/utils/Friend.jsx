import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import UserImage from './UserImage'
import { useDispatch, useSelector } from 'react-redux'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { getFeed } from '../../Actions/Post'

const Friend = ({ownerAvatar, friendId, ownerName, createdAt}) => {
    const {user} = useSelector((state) => state.user) 
    const isFriend = user.following.find((friend) => friend._id === friendId);

    const dispatch = useDispatch()
    const handleFollowUnfollow = async() => {
        await dispatch(addRemoveUser(friendId));
        await dispatch(getFeed())
        await dispatch(toFollow())
        dispatch(LoadUser())
      }

  return (
    <Stack direction={'row'} gap={2} p={2} alignItems={'center'}>
        <UserImage image = {ownerAvatar} firstName={ownerName} />
        <Stack direction={'column'} sx={{width: "80%"}}>
            <Typography variant='h6'> {ownerName} </Typography>
            <Typography variant='p'>{new Date(createdAt).toLocaleString()}</Typography>
        </Stack>
        {friendId !== user._id ? (
            <Button onClick={handleFollowUnfollow} >
                {isFriend ? (
                <PersonRemoveOutlined  />
                ) : (
                <PersonAddOutlined  />
                )}
            </Button>
        ) : null }
    </Stack>
  )
}

export default Friend