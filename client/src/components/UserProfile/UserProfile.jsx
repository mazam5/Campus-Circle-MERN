import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../../Actions/Post'
import Feed from '../Feed/Feed'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, Stack, TextField, Typography, alertClasses, useMediaQuery } from '@mui/material'
import UserImage from '../utils/UserImage'
import {Place, Chat, DescriptionOutlined} from '@mui/icons-material';
import Following from '../utils/Followings'
import Followers from '../utils/Follows'
import Loader from '../Loader/Loader'
import { Work } from '@mui/icons-material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { getUserProfile } from '../../Actions/User'
import { getBlogs, getSavedBlogs } from '../../Actions/Blog'
import Story from '../Blog/Home/Story'
import axios from 'axios'

const UserProfile = () => {
    const dispatch = useDispatch()
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    const loggedInUser = useSelector((state)=>state.user.user)
    const [myProfile, setMyProfile] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [tab, setTab] = useState('post');
    const [message, setMessage] = useState('');
    const params = useParams();

    useEffect(()=> {
      if(loggedInUser._id.toString() === params.id.toString()) {
        setMyProfile(true)
      }
    },[params.id, loggedInUser])
    
    useEffect(()=> {
      dispatch(getUserProfile(params.id))
      dispatch(getUserPost(params.id))
      dispatch(getSavedBlogs())
      dispatch(getBlogs(`?user=${params.id}`))
    },[dispatch, params.id])

    const {posts, loading} = useSelector((state)=>state.userPosts)
    const {user} = useSelector((state)=> state.userProfile)
    const {allBlog} = useSelector((state)=>state.blog)
    const {savedBlog} = useSelector((state)=>state.blog)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSend = async() => {
      const validMessage = message.trim();
      let res1;
      let res2;

      const {data} = await axios.get(`/chat/find/${loggedInUser._id}/${params.id}`)
      if(validMessage!=='') {
        // check if the conversation exist, if yes no need of the below line.
        if(data) {
          res2 = await axios.post('/message', {conversationId:`${data?._id}`, senderId:`${loggedInUser._id}`, text:message})
        }
        else {
          res1= await axios.post('/chat/new', {senderId:loggedInUser._id, receiverId:params.id})
          res2 = await axios.post('/message', {conversationId:`${res1?.data?._id}`, senderId:`${loggedInUser._id}`, text:message})
        }
      }else{
        alert("something went wrong")
      }
      setOpen(false);
    };
  

    if (myProfile) {
      return <Navigate to={'/account'} />
    }
    
  return (
    <>
    {loading ? (<Loader />) : 
      ( 
      user && (
    <Stack direction={{xs:'column', md:'row'}} gap={2} py={4} height={'90vh'}>
        <Stack direction={'column'} width = {{xs:'100',md:'40%'}} gap={{xs:1,md:2}} p={{xs:0, md:0}} m={{xs:1, md:5}} mt={1}>
            <Box mx={'auto'} sx={{display:{xs:'block', md:'none'}}}>
                <UserImage image = {user.avatar} width = {isSmallScreen?100: 150} height = {isSmallScreen?100:150} firstName = {user.firstName}/>
            </Box>
            <Stack direction={'row'} mb={1} mx={'auto'} gap={2}>
              <Box sx={{display:{xs:'none', md:'block'}}}>
                <UserImage image = {user.avatar} width = {isSmallScreen?100: 150} height = {isSmallScreen?100:150} firstName = {user.firstName}/>
              </Box>
              <Stack width = {'100%'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant='h6'>{user.firstName} {user.lastName}</Typography>
                  <Typography variant='p' display={user.location?'block' : 'none'} ><Place fontSize='small' />{user.location}</Typography>
                  <Typography variant='p' sx={{display: {xs:'block', md:'none',lg:'block'}}} display={user.desc?'block' : 'none'}>{user.desc}</Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-50'/>
            <Stack direction={'row'} mx={5} justifyContent={'space-around'} alignItems={'center'}>
                <Followers isUser={true} userId = {user._id}/>
                <Divider variant="middle" orientation='vertical' className='dark:bg-gray-300'/>
                <Following isUser={true} userId = {user._id}/>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-50'/>
            <Stack direction={'row'} gap={1}> 
                <Typography variant='p' ml={2} > <Work/> Works in </Typography>
                <Typography variant='p' mr={3} >{user.company ?user.company:'...'}</Typography>
            </Stack>
            <Typography variant='p' ml={2}> <PsychologyOutlinedIcon /> {user.occupation}</Typography>
            <Typography variant='p' ml={2} sx={{display: {xs:'none', md:'block',lg:'none'}}} display={user.desc?'block' : 'none'}><DescriptionOutlined />{" " +user.desc}</Typography>

            <Divider variant="middle" className='dark:bg-gray-50'/>
            <Stack direction={'row'} justifyContent={'space-between'}> 
                <Typography variant='p' ml={2} color={'gray'}> Who's viewed your profile </Typography>
                <Typography variant='p' mr={3} > {user.viewedProfiles} </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='p' ml={2} color={'gray'}> Posts </Typography>
                <Typography variant='p' mr={3} > {posts ? posts.length:0} </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant='p' ml={2} color={'gray'}> Blogs </Typography>
                <Typography variant='p' mr={3} >{allBlog?.length} </Typography>
            </Stack>
            <Button variant='contained' color='primary' onClick={handleClickOpen}> <Chat sx={{ mr: 1 }}/> Chat</Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Send Message</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText> */}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  minRows={2}
                  label="Type your message here..."
                  type="email"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSend}>Send</Button>
              </DialogActions>
            </Dialog>

        </Stack>
        <Stack width = {{xs:'100',md:'50%'}} m={2}>
        <Stack direction={'row'} gap={2}>
          <Button onClick={()=>setTab('post')}>Posts</Button>
          <Button onClick={()=>setTab('blog')}>Blogs</Button>
        </Stack>
        <Divider></Divider>
        {tab==='post' ? (
          <Box className = 'overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
          {posts && posts.length>0 ? posts.map(post => (
            <Feed 
              key={post._id}
                  postId = {post._id}
                  caption = {post.desc}
                  postImage = {post.image}
                  createdAt={post.createdAt}
                  likes = {post.likes}
                  comments = {post.comments}
                  ownerId = {post.userId._id}
                  ownerName = {post.userId.firstName + " "+post.userId.lastName}
                  ownerAvatar = {post.userId.avatar}
                  user={user} 
                  isUser = {true}
                  />
              )) : (
                  <Typography>No posts yet!</Typography>
              )}
          </Box>
        ):(null)}
        {tab==='blog' ? (
          <Box className = 'overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
          {allBlog && allBlog.length>0 ? allBlog.map(blog => (
            <Story
              key={blog._id}
              blogId = {blog._id}
              title ={blog.title}
              createdAt={blog.createdAt} 
              readingTime = {blog.readingTime}
              categories = {blog.category}
              likes = {blog.likedBy}
              comments = {blog.comments}
              savedBlog = {savedBlog}
              photo={blog.photo}
              content = {blog.content}
              ownerId={blog.userId._id}
              ownerName = {blog.userId.firstName + " "+blog.userId.lastName}
              ownerAvatar = {blog.userId.avatar}
            />
            )) : (
                <Typography>No Blogs uploaded!</Typography>
          )}
          </Box>
        ):(null)}
    </Stack>
    </Stack>
    )
  )}
    </>
  )
}
export default UserProfile