import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import profile from '../../../assets/profile.jpg'

const ToFollow = ({}) => {
  return (
    <>
      <Typography variant='h6' >Who to Follow</Typography>
      <Stack direction={'row'} gap={2} mx={2} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={1} alignItems={'center'}>

            <Avatar src={profile} sx={{width:50, height:50}}/>
            <Typography variant='h6' >Srivallabh</Typography>
            
        </Stack>
        <Button variant='text' >Follow</Button>
      </Stack>
      <Stack direction={'row'} gap={2} mx={2} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={1} alignItems={'center'}>

            <Avatar src={profile} sx={{width:50, height:50}}/>
            <Typography variant='h6' >Srivallabh</Typography>
            
        </Stack>
        <Button variant='text' >Follow</Button>
      </Stack>
      <Stack direction={'row'} gap={2} mx={2} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={1} alignItems={'center'}>

            <Avatar src={profile} sx={{width:50, height:50}}/>
            <Typography variant='h6' >Srivallabh</Typography>
            
        </Stack>
        <Button variant='text' >Follow</Button>
      </Stack>

    </>
  )
}

export default ToFollow