import { Box, Stack, Typography } from '@mui/material'
import {useSelector} from 'react-redux'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Conversation from './Pages/Conversation'
import ForumIcon from '@mui/icons-material/Forum';
import ChatBox from './Pages/ChatBox'
import {io} from 'socket.io-client'

function Chat() {
  const {user} = useSelector((state)=>state.user)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()

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

  // connect to socket.io
  useEffect(()=> {
    socket.current = io("ws://localhost:8080");
    socket.current.emit('new-user', user._id)
    socket.current.on('get-users', (users)=> {
      setOnlineUsers(users)
    });
  }, [user])  

  // sending message to socket server
  useEffect(()=> {
    if(sendMessage!==null) {
      socket.current.emit('send-message', sendMessage);
    }
  },[sendMessage]);
   
  // receive message from socket server
  useEffect(()=>{
    socket.current.on("receive-message", (data)=> {
      setReceiveMessage(data)
    });
  },[]);

  const checkOnline = (chat) => {
    const chatMember = chat.members.find((member)=>member !== user._id);
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true :false;
  }

  return (
    <Box height={'88vh'}>
      <Stack direction={'row'} height={'100%'} m={1}>
        <Box className='w-1/4' p={2} >
          <Typography position={'sticky'} variant='h4' mb={3} className='font-bold text-violet-600'><ForumIcon fontSize='large' />Connect</Typography>
          <Box height={'92%'} overflow={'scroll'}>
          {chats && chats.length>0 ? chats.map((chat)=> (
            <Box key={chat._id} alignContent={'center'} className={currentChat?.members?.find((id)=>id!==user._id) === chat?.members?.find((id)=>id!==user._id) ? "bg-blue-200 flex rounded-md" : ""} onClick={()=>setCurrentChat(chat)}>
              {currentChat?.members?.find((id)=>id!==user._id) === chat?.members?.find((id)=>id!==user._id) ? (
                <Box className='w-1 my-auto rounded-r-sm bg-blue-500 h-16'></Box>
              ):(null)}
              <Box m={1} p={1} px={2} >
                <Conversation key={chat._id} data={chat} currentUserId = {user._id} online={checkOnline(chat)} />
              </Box>
            </Box>
          )) : (null)}
          </Box>
        </Box>
        <Box className='w-3/4 bg-slate-200' height={'100%'}>
          <ChatBox chat = {currentChat} currentUserId= {user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
        </Box>
      </Stack>
    </Box>
  )
}

export default Chat


// // // <Box>Please select user to see chats</Box>
// //           // <Stack direction={'row'} alignItems={'center'} m={1}>

// //           //   <TextField
// //           //     sx={{backgroundColor:'white'}}
// //           //     multiline
// //           //     minRows={1}
// //           //     maxRows={3}
// //           //     hiddenLabel
// //           //     placeholder="Enter text here"
// //           //     variant="outlined"
// //           //     fullWidth
// //           //     size='medium'
// //           //   />

// //           //   <Button><EmojiEmotions fontSize='large'/></Button>
// //           //   <Button><AttachFile fontSize='large'/></Button>
// //           //   <Button ><SendRounded fontSize='large'/></Button>

// //           // </Stack>


// import { Box, Stack, Typography } from '@mui/material'
// import React, {useState, useEffect} from 'react'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import Conversation from './Pages/Conversation'
// import ChatBox from './Pages/ChatBox'

// const Chat = () => {
//   const {user} = useSelector((state)=>state.user)
//   const [chats, setChats] = useState([])
//   const [currentChat, setCurrentChat] = useState(null)

//   useEffect(()=> {
//     const getChats = async() => {
//       try {
//         const {data} = await axios.get(`/chat/${user._id}`)
//         setChats(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getChats()
//   }, [user])

//   return (
//     <Box height={'88vh'}>
//       <Stack direction={'row'} height={'100%'} m={1}>
//         <Box className='w-1/4'>
//           <Typography variant='h4'>Chats</Typography>
//           {chats && chats.length>0 ? chats.map((chat)=> (
//             <Box key={chat._id} className='hover:bg-slate-200 cursor-pointer' m={1} mr={2} onClick={()=>setCurrentChat(chat)}>
//               <Conversation key={chat._id} data={chat} currentUserId = {user._id} />
//             </Box>
//           )) : (null)}
//         </Box>
//         <Box className='w-3/4 bg-slate-200' height={'100%'}>
//           <ChatBox chat = {currentChat} currentUserId= {user._id} />
//         </Box>
//       </Stack>
//     </Box>
//   )
// }

// export default Chat