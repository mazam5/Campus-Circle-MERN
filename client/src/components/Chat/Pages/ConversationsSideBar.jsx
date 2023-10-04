import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'
import React from 'react'
import UserImage from '../../utils/UserImage'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const ConversationsSideBar = ({data, currentUserId, online}) => {
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
    <Box width={{xs:'15%', sm:'10%'}}>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 1,}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 1 : 'auto', justifyContent: 'center',}}>
                    <UserImage image= {userData?.avatar} width={isSmallScreen?40 :50} height={isSmallScreen?40 :50} firstName={userData?.firstName} isOnline={online} />
                </ListItemIcon>
                <ListItemText primary={userData?.firstName+' '+ userData?.lastName} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </Box>
  )
}

export default ConversationsSideBar