import React from 'react'
import UserImage from '../utils/UserImage'
import { useDispatch } from 'react-redux'

import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'

const FollowUser = ({avatar, firstName, lastName, followId}) => {
    const dispatch = useDispatch()

    const followUnfollowUser = async(key) => {
        await dispatch(addRemoveUser(key))
        await dispatch(toFollow(key))
        dispatch(LoadUser())
    }
  return (
    <Stack direction={'row'} spacing={2} m={2} alignItems={'center'}>
                <UserImage image={avatar} firstName={firstName} />
                <Box width={'100%'}>
                    <Link to={`/user/${followId}`}>
                    <Typography variant='h6' sx={{width:'100%'}}>{firstName} {lastName}</Typography>
                    </Link>
                </Box>
                <Button size="medium" variant="text" onClick={()=> followUnfollowUser(followId)}>
                    follow 
                </Button>
            </Stack>
  )
}

export default FollowUser