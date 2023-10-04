import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import {EditNoteRounded} from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import PopularBlog from './Home/PopularBlog';
import Categories from './Home/Categories';
import SavedBlog from './Home/SavedBlog';
import Story from './Home/Story';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggFollow } from '../../Actions/User';
import FollowUser from '../leftSidebar/FollowUser';
import { getBlogs, getFollowingBlogs, getPopularBlogs, getSavedBlogs } from '../../Actions/Blog';
import Sidebar from './Home/Sidebar';

function Blog() {
  const [followingBlogs, setFollowingBlogs] = useState(false);
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const location = useLocation();
  const query = location.search

  useEffect(()=> {
    dispatch(getSuggFollow())
    if(followingBlogs) {
      dispatch(getFollowingBlogs())
    }
    else{
        dispatch(getBlogs(query))
    }
    dispatch(getPopularBlogs())
    dispatch(getSavedBlogs())
  },[dispatch, followingBlogs,query])

  useEffect(() => {
    if(search !== '') {
      
    }
  }, [search])
  
  const {suggFollow} = useSelector((state)=> state.user); 
  const {popularBlog} = useSelector((state)=> state.blog);
  const {allBlog} = useSelector((state)=> state.blog);
  const {followingBlog} = useSelector((state)=> state.blog);
  const {savedBlog} = useSelector((state)=> state.blog);

  const suggestFollow = suggFollow?.slice(0, 3);
  const popularBlogs = popularBlog?.slice(0, 3);
  const savedBlogs = savedBlog?.slice(0, 2);
  
  return (
    <>
    <Stack direction={'row'} sx={{m:{xs:'1rem', sm:'2rem'}}} gap={{xs:0, sm:2}}>
      <Box sx={{width:{xs:'100%', md:'70%'}}} >
        <Stack direction={'row'} px={2} gap={{xs:1, sm:2}}>
          <Button onClick={()=> setFollowingBlogs(false)}>
            <Typography variant = 'p'>For you</Typography>
          </Button>
          <Button onClick={()=> setFollowingBlogs(true)}>
            <Typography variant = 'p'>Following</Typography>
          </Button>
        </Stack>
        <Divider className='dark:bg-gray-300'/>
        <Box>
          {followingBlogs ? (
            followingBlog && followingBlog.length> 0 ? followingBlog.map((blog)=> (
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
              <Typography variant='p' >No blogs yep!</Typography>
            )
          ) :(
            allBlog && allBlog.length> 0 ? allBlog.map((blog)=> (
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
              <Typography variant='p' >No blogs yep!</Typography>
            )
          )}
        </Box>
      </Box>
      <Box m={2} width={'30%'} sx={{display:{xs:'none', md:'block'}}} >
        <Stack direction={'column'} gap={2}> 
          <Link to={'/blog/write'}>
            <Button fullWidth variant='contained' startIcon={<EditNoteRounded fontSize='medium' />} >Write</Button>
          </Link>
          <Typography variant='h6'>Popular Blog</Typography>
          {popularBlogs && popularBlogs.length> 0 ? popularBlogs.map((blog)=> (
            <PopularBlog 
              key={blog._id}
              blogId={blog._id}
              ownerAvatar = {blog.userId.avatar}
              ownerId = {blog.userId._id}
              firstName = {blog.userId.firstName} 
              lastName = {blog.userId.lastName} 
              title = {blog.title}
              category={blog.category}
            />
          )) : (
            <Typography variant='p' >No popular blogs</Typography>
          )}
          <Link to={'/blog/me/following/suggestions'}>
            <Typography variant='p' color={'darkgreen'}>See full list</Typography>
          </Link>
          <Divider variant="middle" className='dark:bg-gray-5'/>
          <Typography variant='h6' >Who to Follow</Typography>
            {suggestFollow && suggestFollow.length>0 ? suggestFollow.map((user)=> (
                <FollowUser key={user._id} isBlog={true} desc={user.desc} avatar = {user.avatar} firstName = {user.firstName} lastName = {user.lastName} followId = {user._id}/>
              )) : (
                <Typography>No users to Suggest</Typography>
            )}
          <Link to={'/blog/me/following/suggestions'}>
            <Typography variant='p' color={'darkgreen'}>See more suggestions</Typography>
          </Link>
          <Divider variant="middle" className='dark:bg-gray-5'/>
          <Categories />
          <Divider variant="middle" className='dark:bg-gray-5'/>
          <Typography variant='h6'>Recently saved</Typography>
          {savedBlogs && savedBlogs.length> 0 ? savedBlogs.map((blog)=> (
            <SavedBlog
              key={blog._id}
              firstName = {blog.userId.firstName}
              lastName = {blog.userId.lastName}
              createdAt = {blog.createdAt}
              readingTime = {blog.readingTime}
              title = {blog.title}     
              categories = {blog.category} 
              ownerAvatar = {blog.userId.avatar}
              ownerId = {blog.userId._id}
              blogId = {blog._id}
            />
          )):(null)}
          <Link to={'/blog/me/following/suggestions'}>
            <Typography variant='p' color={'darkgreen'}>{`See all(${savedBlog?.length})`}</Typography>
          </Link>
        </Stack>
      </Box>
      <Sidebar/>
    </Stack>
    </>
  )
}

export default Blog