import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FollowUser from '../../leftSidebar/FollowUser';
import { getSuggFollow } from '../../../Actions/User';
import { getBlogs, getPopularBlogs, getSavedBlogs } from '../../../Actions/Blog';
import Story from '../Home/Story';
import {useMediaQuery} from '@mui/material';

const Suggestions = () => {
  const isTabScreen = useMediaQuery('(max-width:670px)');
  const isSmallScreen = useMediaQuery('(max-width:428px)');
    const [text, setText] = useState('popular')
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getSuggFollow())
        dispatch(getBlogs())
        
        dispatch(getPopularBlogs())
        dispatch(getSavedBlogs())
      },[dispatch])

    const {suggFollow} = useSelector((state)=> state.user); 
    const {savedBlog} = useSelector((state)=>state.blog)
    const {popularBlog} = useSelector((state)=>state.blog)

  return (
    <Box m={{xs:2, md:10}} width={{xs:'90%', sm:'80%', md:'60%' ,lg:'50%'}}>
        <Typography sx={{fontWeight:{xs:500, md:600}}} variant={isSmallScreen? 'h5': isTabScreen?'h4':'h3'}>Refine recommendations</Typography>
        <Stack mt={4} direction={'row'}>
            <Button onClick={()=>setText("popular")} variant='text'>Popular</Button>
            <Button onClick={()=>setText("saved")} variant='text'>Saved</Button>
            <Button onClick={()=>setText("suggest")} variant='text'>Suggestions</Button>
        </Stack>
        <Divider sx={{mb:'1rem'}}></Divider>
        {text === "saved"? (savedBlog && savedBlog.length> 0 ? savedBlog.map((blog)=> (
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
          )):(
            <Typography variant='h6'>No saved blogs</Typography>
          )) : (null) } 
        {text === "popular"? (
            popularBlog && popularBlog.length> 0 ? popularBlog.map((blog)=> (
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
                <Typography variant='p' >No popular blogs</Typography>
              )
        ) : (null) } 
        {text === "suggest"? (
            suggFollow && suggFollow.length>0 ? suggFollow.map((user)=> (
                <FollowUser desc={user.desc} key={user._id} isRecommend={true} isBlog={true} avatar = {user.avatar} firstName = {user.firstName} lastName = {user.lastName} followId = {user._id}/>
              )) : (
                <Typography>No users to Suggest</Typography>
            )
        ) : (null) } 
    </Box>
  )
}

export default Suggestions