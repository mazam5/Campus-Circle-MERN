import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPost } from '../../Actions/Post'
import Feed from '../Feed/Feed'
import { Avatar, Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import CreatePost from '../Feed/CreatePost'
import UserImage from '../utils/UserImage'
import PlaceIcon from '@mui/icons-material/Place';
import Following from '../utils/Followings'
import Followers from '../utils/Follows'
import { Delete, Work } from '@mui/icons-material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import UserModal from '../leftSidebar/UserModal'
import axios from 'axios'
import { Logout } from '../../Actions/User'
import { useParams } from 'react-router-dom'
import { getBlogs, getSavedBlogs } from '../../Actions/Blog'
import Story from '../Blog/Home/Story'

const Account = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState('post');
    const params = useParams();

    const {user} = useSelector((state)=> state.user)
    useEffect(() => {
        dispatch(getMyPost())
        dispatch(getSavedBlogs())
        dispatch(getBlogs(`?user=${user._id}`))
    }, [dispatch, user])

    const posts = useSelector((state)=>state.post.myposts) 
    const {allBlog} = useSelector((state)=>state.blog)
    const {savedBlog} = useSelector((state)=>state.blog)

    const handleDelete = async() => {
        try {
            await axios.delete(`/users/${user._id}`);
            await axios.delete(`/post/${user._id}/all`)
            dispatch(Logout())
        } catch (error) {
            console.log(error)
        }
    }
    const handleClose = () => {
        setOpen(false)
    }


  return (
    <Stack direction={'row'} gap={2} py={2} height={'90vh'}>
        <Stack direction={'column'} width = {'30%'} gap={2} p={2} m={4} mt={1}>
            <Stack direction={'row'} mb={2} ml={2} gap={2}>
                <UserImage image = {user.avatar} width = {150} height = {150} firstName = {user.firstName}/>
                <Stack width = {'100%'} flexWrap={'wrap'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h6'>{user.firstName} {user.lastName}</Typography>
                    <Typography variant='p' display={user.location?'block' : 'none'} ><PlaceIcon fontSize='small' />{user.location}</Typography>
                    <Typography variant='p' display={user.desc?'block' : 'none'}>{user.desc}</Typography>
                </Stack>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Stack direction={'row'} mx={5} justifyContent={'space-around'} alignItems={'center'}>
                <Followers />
                <Divider variant="middle" orientation='vertical' className='dark:bg-gray-800'/>
                <Following />
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Stack direction={'row'} gap={1}> 
                <Typography variant='p' ml={2} sx={{color:'gray'}}> <Work/> Works in </Typography>
                <Typography variant='p' mr={3} >{user.company ?user.company:'...'}</Typography>
            </Stack>
            <Typography variant='p' ml={2}> <PsychologyOutlinedIcon /> {user.occupation}</Typography>

            <Divider variant="middle" className='dark:bg-gray-300'/>
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
                <Typography variant='p' mr={3} > {allBlog?.length} </Typography>
            </Stack>
            <UserModal show = {true} />
            <Button variant='contained' color='error' onClick={()=>setOpen(!open)} startIcon = {<Delete fontSize='small'/>}>Delete Profile</Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
                    <Stack direction={'column'} alignItems={'center'} spacing={2}>
                        <Avatar src = {`http://localhost:8800/assets/${user.avatar}`} sx={{width: 80, height: 80 }} alt = {user.firstName} />
                        <Typography variant='h6'>Are you sure, you want delete your Account {user.firstName}?</Typography>

                        <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                        <Button variant='text' color='error' onClick={handleDelete}>Delete</Button>
                        <Divider variant="middle" sx={{width:'80%',color:"black"}} />
                        <Button variant='text' color='secondary' onClick={()=> setOpen(!open)}>Cancle</Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>

        <Stack width={'50%'} my={2}>
        <Stack direction={'row'} gap={2}>
          <Button onClick={()=>setTab('post')}>Posts</Button>
          <Button onClick={()=>setTab('blog')}>Blogs</Button>
        </Stack>
        <Divider></Divider>
        {tab==='post' ? (
        <Box className = 'overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
            <CreatePost isAccount={true}/>
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
                    isAccount={true}
                    isDelete={true}
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
}

export default Account