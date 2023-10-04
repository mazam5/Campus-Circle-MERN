import React from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { LoadUser } from '../../Actions/User'
import {  Box, Paper, Typography } from '@mui/material'
import Following from './Following'

const Friend = () => {

  const {following} = useSelector((state)=> state.user.user)
  return (
    <Paper m={1} minHeight={'220px'}>
        <Typography variant='h5'>Following</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {following && following.length>0 ? (following.map((f)=> (
          <Following key={f._id} avatar={f?.avatar} firstName={f?.firstName} lastName={f?.lastName} id ={f._id} />
        ))):(
          <Typography align='center' m={2} variant='h6'>No followings yet!</Typography>
          )}
        </Box>
    </Paper>
  )
}

export default Friend
