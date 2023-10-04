import { Box, Divider, Stack, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserImage from '../../utils/UserImage'

const Conversation = ({data, currentUserId, online}) => {
    const [userData, setUserData] = useState(null)
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    useEffect(()=> {
        const userId = data.members.find((id)=>id!==currentUserId)
        const getUserData = async() => {
            try {
                const {data} = await axios.get(`/users/${userId}`)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])
  return (
    <Box >
        <Stack direction={'row'} alignItems={'center'} className='cursor-pointer' gap={1} alignContent={'center'}>
            <UserImage image= {userData?.avatar} firstName={userData?.firstName} isOnline={online} />
            <Stack direction={'column'} >
                <Typography variant='h6'>{userData?.firstName} {userData?.lastName}</Typography>
                <Typography  variant='p'>{online? "Online" : "Offline"}</Typography>
            </Stack>
        </Stack>
        {/* <Divider variant="middle" className='dark:bg-gray-50'/> */}
    </Box>
  )
}

export default Conversation