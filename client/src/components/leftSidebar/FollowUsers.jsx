import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, addRemoveUser, toFollow } from '../../Actions/User'
import { Box, Button, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'

const FollowUsers = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(toFollow())
    },[dispatch])
    
    const followUnfollowUser = async(key) => {
        await dispatch(addRemoveUser(key))
        await dispatch(toFollow(key))
        dispatch(LoadUser())
    }
    const {followList} = useSelector((state)=> state.user)
  return (
    <div className='m-8 h-1/3 bg-orange-200'>
        <Typography variant='h5'>Pending Requests</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {followList && followList.length>0 ? (followList.map((f) => (
            <Stack direction={'row'} spacing={2} m={2} alignItems={'center'} key={f._id}>
                <UserImage image={f.avatar} firstName={f.firstName} />
                <Typography variant='h6' sx={{width:'100%'}}>{f.firstName} {f.lastName}</Typography>
                <Button size="medium" variant="text" onClick={()=> followUnfollowUser(f._id)}>
                    follow 
                </Button>
            </Stack>
        ))):(
            <Typography align='center' m={2} variant='h6'>No Requests yet!</Typography>
        )} 
        </Box>
    </div>
  )
}

export default FollowUsers