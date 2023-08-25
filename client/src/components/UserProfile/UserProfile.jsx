import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPost } from '../../Actions/Post'
import Feed from '../Feed/Feed'
import { Box, Divider, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'
import PlaceIcon from '@mui/icons-material/Place';
import Following from '../utils/Followings'
import Followers from '../utils/Follows'
import Loader from '../Loader/Loader'
import { Work } from '@mui/icons-material'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import { getUserProfile } from '../../Actions/User'

const UserProfile = () => {
    const dispatch = useDispatch()

    const loggedInUser = useSelector((state)=>state.user.user)
    const [myProfile, setMyProfile] = useState(false);
  const params = useParams();

    useEffect(()=> {
      if(loggedInUser._id.toString() === params.id.toString()) {
        setMyProfile(true)
      }
    },[params.id, loggedInUser])
    
    useEffect(()=> {
      dispatch(getUserProfile(params.id))
      dispatch(getUserPost(params.id))
    },[dispatch, params.id])

    const {posts, loading} = useSelector((state)=>state.userPosts)
    const {user} = useSelector((state)=> state.userProfile)

    if (myProfile) {
      return <Navigate to={'/account'} />
    }
    
  return (
    <>
    {loading ? (<Loader />) : 
      ( 
      user && (
    <Stack direction={'row'} gap={2} height={'90vh'}>

        <Stack direction={'column'} width = {'30%'} className='bg-emerald-100' gap={2} p={2} m={4} mt={1}>
            <Stack direction={'row'} mb={2} ml={2} gap={2}>
                <UserImage image = {user.avatar} width = {150} height = {150} firstName = {user.firstName}/>
                <Stack width = {'100%'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h6'>{user.firstName} {user.lastName}</Typography>
                    <Typography variant='p' display={user.location?'block' : 'none'} ><PlaceIcon fontSize='small' />{user.location}</Typography>
                    <Typography variant='p' display={user.desc?'block' : 'none'}>{user.desc}</Typography>
                </Stack>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Stack direction={'row'} mx={5} justifyContent={'space-around'} alignItems={'center'}>
                <Followers isUser={true} userId = {user._id}/>
                <Divider variant="middle" orientation='vertical' className='dark:bg-gray-800'/>
                <Following isUser={true} userId = {user._id}/>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Stack direction={'row'} gap={1}> 
                <Typography variant='p' ml={2} sx={{color:'gray'}}> <Work/> Works in </Typography>
                <Typography variant='p' mr={3} >Google</Typography>
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
                <Typography variant='p' mr={3} > 2 </Typography>
            </Stack>
        </Stack>
        <Box width={'50%'} className = 'overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
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
    </Stack>
    )
  )}
    </>
  )
}
export default UserProfile