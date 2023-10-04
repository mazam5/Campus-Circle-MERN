import React, { useState } from 'react'
import UserImage from '../utils/UserImage'
import { useDispatch } from 'react-redux'

import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'

const FollowUser = ({avatar, firstName, lastName, followId, desc, isRecommend=false, isBlog=false}) => {
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(false);

    const followUnfollowUser = async(key) => {
        await dispatch(addRemoveUser(key))
        if(isBlog) {
            setFlag(!flag);
        }
        else{
            await dispatch(toFollow(key))
            dispatch(LoadUser())
        }
    }
  return (
    <>
    <Stack direction={'row'}  my={!isBlog ? 3 :0} m={!isBlog ? 1: isRecommend ? 2:0} gap={2} alignItems={'center'}>
        <UserImage image={avatar} firstName={firstName} width={60} height={60} />
        <Stack width={'100%'}>
            <Link to={`/user/${followId}`}>
            <Typography variant='h6' sx={{width:'100%'}}>{firstName} {lastName}</Typography>
            <Typography variant='p' sx={{width:'100%'}}>{desc}</Typography>
            </Link>
        </Stack>
        {isBlog ? (
            <Button size="medium" variant="contained" sx={{backgroundColor:'green', color:'white', ":hover": {backgroundColor:'white', color:'black'}}} onClick={()=> followUnfollowUser(followId)}>
                {flag ? "Following" : "Follow"}
            </Button>
            ) : (
                <Button size="medium" variant="contained" sx={{backgroundColor:'green', color:'white', ":hover": {backgroundColor:'white', color:'black'}}} onClick={()=> followUnfollowUser(followId)}>
                Follow 
            </Button>
        )}
    </Stack>
    </>
  )
}

export default FollowUser