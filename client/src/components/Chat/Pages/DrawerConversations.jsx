import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {WhatshotRounded, GroupRounded, EditNoteRounded, BookRounded, CategoryRounded} from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ConversationsSideBar from './ConversationsSideBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client'
import axios from 'axios';
import { useRef } from 'react';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      top:'15%',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  

const DrawerConversations = ({currentChat,setCurrentChat}) => {
    const theme = useTheme();
    const [onlineUsers, setOnlineUsers] = useState([])
    const [chats, setChats] = useState([])
  const [open, setOpen] = React.useState(false);
  const {user} = useSelector((state)=>state.user)
  const socket = useRef()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    socket.current = io("ws://localhost:8080");
    socket.current.emit('new-user', user._id)
    socket.current.on('get-users', (users)=> {
      setOnlineUsers(users)
    });
  }, [user])  

  useEffect(()=> {
    const getChats = async() => {
      try {
        const {data} = await axios.get(`/chat/${user._id}`)
        setChats(data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user._id])

  const checkOnline = (chat) => {
    const chatMember = chat.members.find((member)=>member !== user._id);
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true :false;
  }

  return (
    <Box sx={{ display: {xs:'flex', md:'none'}}}>
      <Drawer sx={{position:'absolute'}} variant="permanent"  open={open}>
        <List width={'100%'} sx={{position:'absolute', top:'10%', mr:{xs:2, sm:0}}}>
        <DrawerHeader>
          <ListItem disablePadding>
          {open ? (
                <ListItemButton sx={{minHeight: 48, justifyContent:'initial', px: 1, my:0.7}} onClick={handleDrawerClose}>
                  <ListItemIcon sx={{minWidth: 0, mr: 2, justifyContent: 'center'}}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </ListItemIcon>
                </ListItemButton>
            ) : (
                <ListItemButton sx={{minHeight: 48,justifyContent: 'center',px: 1, my:0.7}} onClick={handleDrawerOpen}>
                  <ListItemIcon sx={{minWidth: 0,mr: 'auto',justifyContent: 'center'}}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </ListItemIcon>
                </ListItemButton>
            )}
          </ListItem>
        </DrawerHeader>
        <Divider />
        {chats && chats.length>0 ? chats.map((chat)=> (
            <Box key={chat._id}  width={'100%'} alignContent={'center'} className={currentChat?.members?.find((id)=>id!==user._id) === chat?.members?.find((id)=>id!==user._id) ? "bg-blue-200 flex rounded-md" : ""} onClick={()=>setCurrentChat(chat)}>
                <ConversationsSideBar key={chat._id} data={chat} currentUserId = {user._id} online={checkOnline(chat)} />
            </Box>
          )) : (null)}
        </List>
      </Drawer>
    </Box>
  )
}

export default DrawerConversations