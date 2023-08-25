import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toFollow } from '../../Actions/User'
import { Box, Typography } from '@mui/material'

import FollowUser from './FollowUser'

const FollowUsers = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(toFollow())
    },[dispatch])

    const {followList} = useSelector((state)=> state.user)
  return (
    <Box maxHeight={'220px'} className='bg-orange-200'>
        <Typography variant='h5'>Pending Requests</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {followList && followList.length>0 ? (followList.map((f) => (
            <FollowUser key={f._id} avatar = {f.avatar} firstName = {f.firstName} lastName = {f.lastName} followId = {f._id}/>
        ))):(
            <Typography align='center' m={2} variant='h6'>No Requests yet!</Typography>
        )} 
        </Box>
    </Box>
  )
}

export default FollowUsers