import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import UserImage from '../../utils/UserImage'
import {format} from 'timeago.js'
import { AttachFile, EmojiEmotions, SendRounded } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const ChatBox = ({chat, currentUserId, setSendMessage, receiveMessage}) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()
    

    useEffect(()=> {
        const userId = chat?.members?.find((id)=> id !== currentUserId)
        const getUserData = async() => {
            try {
                const {data} = await axios.get(`/users/${userId}`)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(chat !==null ) getUserData();
    }, [chat, currentUserId]);

    // fetching data from messages
    useEffect(()=> {
        const getMessages = async() => {
             try {
                const {data} = await axios.get(`/message/${chat._id}`)
                setMessages(data)
             } catch (error) {
                console.log(error)
             }
        }   
        if(chat!==null) getMessages();
    }, [chat]);

    // Receive message from parent component

    useEffect(()=> {
        if(receiveMessage !== null && receiveMessage?.conversationId === chat?._id) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage]);


    const handleSend = async(e) => {
        // e.preventDefault();
        const message = {
            senderId : currentUserId,
            text: newMessage,
            conversationId: chat._id,
        }
        // to socket
        const receiverId = chat.members.find((id)=>id !== currentUserId)
        setSendMessage({...message, receiverId})
        // sending to database
        try {
            const {data} = await axios.post('/message', message)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    // auto scroll to end
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messages])


      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default behavior (line break) of Enter key
            if(newMessage?.length>0) handleSend() // Call the function to send the message
        }
    };

  return (
    <>
    {chat? (
        <Stack direction={'column'} height={'100%'}>
            <Stack position={'sticky'} direction={'row'} alignItems={'center'} gap={1} m={2} mb={1}>
                <UserImage image= {userData?.avatar} firstName={userData?.firstName} />
                <Stack direction={'column'} >
                    <Link to={`/user/${userData?._id}`}>
                        <Typography variant='h6'>{userData?.firstName} {userData?.lastName}</Typography>
                    </Link>
                </Stack>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-200'/>
            {/* messages */}
            <Stack direction={'column'} justifyContent={'space-between'} mt={1} height={'85%'}>
                <Box className='flex flex-col overflow-scroll gap-1'>
                    {messages && messages.map((message)=> (
                        <Box ref ={scroll} key={message._id} p={1} maxWidth={'28rem'} className={ message.senderId===currentUserId ? 'bg-blue-300':'bg-white'} sx={{mx:'1rem', borderRadius:'10px', width:'fit-content', alignSelf:message.senderId===currentUserId? 'flex-end':'auto'}}>
                            <Typography fontSize={'1.2rem'}>{message.text}</Typography>
                            <Typography variant='p'>{format(message.createdAt)}</Typography>
                        </Box>
                    ))}
                </Box>
                {/* message Sender */}
                <Stack direction={'row'} alignItems={'center'} m={1}>
                    <TextField
                        sx={{backgroundColor:'white'}}
                        multiline
                        minRows={1}
                        maxRows={3}
                        value={newMessage}
                        onChange={(e)=>setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        onKeyDown={handleKeyDown}
                        variant="outlined"
                        fullWidth
                        
                        size='small'  
                    />

                    <Button><EmojiEmotions fontSize='medium'/></Button>
                    <Button><AttachFile fontSize='medium'/></Button>
                    <Button disabled={newMessage === ''} onClick={handleSend}><SendRounded fontSize='medium'/></Button>
                </Stack>
            </Stack>
        </Stack>

    ):(
        <Box className='h-[95%] text-gray-500' display="flex" alignItems={'center'} justifyContent={'center'}>
            <Typography m={2} variant='h6'>&larr; Please select a user from sidebar</Typography>
        </Box>
    )}    
    </>
  )
}

export default ChatBox


// import { Box, Button, Stack, TextField, Typography } from '@mui/material'
// import React,{useState, useEffect} from 'react'
// import UserImage from '../../utils/UserImage'
// import { AttachFile, EmojiEmotions, SendRounded } from '@mui/icons-material'
// import axios from 'axios'
// import InputEmoji from "react-input-emoji";
// import {format} from 'timeago.js'

// const ChatBox = ({chat, currentUserId}) => {
//     const [userData, setUserData] = useState(null)
//     const [messages, setMessages] = useState([])
//     const [text, setText] = useState("");

//     function handleOnEnter(text) {
//       console.log("enter", text);
//     }
    
//     useEffect(()=> {
//         const userId = chat?.members?.find((id)=>id!==currentUserId)
//         const getUserData = async() => {
//             try {
//                 const {data} = await axios.get(`/users/${userId}`)
//                 setUserData(data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         if(chat !==null ) {getUserData()}
//     }, [chat, currentUserId])

//     // fetching data from messages
//     useEffect(()=> {
//         const getMessages = async() => {
//              try {
//                 const {data} = await axios.get(`/message/${chat._id}`)
//                 setMessages(data)
//              } catch (error) {
//                 console.log(error)
//              }
//         }   
//         if(chat!==null) getMessages()
//     }, [chat])

//   return (
//     <>
//     {chat? (
//         <Stack direction={'column'} height={'100%'}>
//             <Stack direction={'row'} alignItems={'center'} gap={1} m={2}>
//                 <UserImage image= {userData?.avatar} firstName={userData?.firstName} />
//                 <Stack direction={'column'} >
//                     <Typography variant='h6'>{userData?.firstName} {userData?.lastName}</Typography>
//                 </Stack>
//             </Stack>
//             {/* messages */}
//             <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}>
//                 <Box className='flex flex-col overflow-scroll gap-1'>
//                     {messages && messages.map((message)=> (
//                         <Box key={message._id} maxWidth={'28rem'} sx={{mx:'1rem', width:'fit-content', alignSelf:message.senderId===currentUserId? 'flex-end':'auto', bgcolor:message.senderId===currentUserId? 'blanchedalmond':'white'}}>
//                             <Typography fontSize={'1.2rem'}>{message.text}</Typography>
//                             <Typography variant='p'>{format(message.createdAt)}</Typography>
//                         </Box>
//                     ))}
//                 </Box>
//                 {/* message Sender */}
//                 <Stack direction={'row'} alignItems={'center'} m={1}>
//                     <TextField
//                         sx={{backgroundColor:'white'}}
//                         multiline
//                         minRows={1}
//                         maxRows={3}
//                         hiddenLabel
//                         placeholder="Enter text here"
//                         variant="outlined"
//                         fullWidth
//                         size='small'
                        
//                     />

//                     <Button><EmojiEmotions fontSize='medium'/></Button>
//                     <InputEmoji
//                         value={text}
//                         onChange={setText}
//                         onEnter={handleOnEnter}
//                         placeholder="Type a message"
//                     />
//                     <Button><AttachFile fontSize='medium'/></Button>
//                     <Button ><SendRounded fontSize='medium'/></Button>
//                 </Stack>
//             </Stack>
//         </Stack>

//     ):(
//         <Typography variant='h6'>Please select a user to see chats</Typography>
//     )}    
//     </>
//   )
// }

// export default ChatBox