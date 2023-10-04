import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom'
import { getSuggFollow, searchUser } from '../../../Actions/User';
import { getBlogs, getPopularBlogs, getSavedBlogs } from '../../../Actions/Blog';
import { useEffect } from 'react';
import Follow from '../../utils/Follow';
import Story from '../Home/Story';
import Category from '../Home/Category';
import axios from 'axios';
import PopularBlog from '../Home/PopularBlog';

const Search = () => {
  const [tab, setTab] = useState('stories');
  const dispatch = useDispatch()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('search')
  const [category, setCategory] = useState(null);

  useEffect(()=>  {
    const getCategory = async () => {
      const {data} = await axios.get(`/category?category=${q}`);
      setCategory(data);
    }
    getCategory();
  },[q])

  useEffect(()=> {
    dispatch(getSuggFollow())
    dispatch(getBlogs(location.search))
    dispatch(searchUser(q))
    dispatch(getPopularBlogs())
    dispatch(getSavedBlogs())
  },[dispatch,q])

  const {allBlog} = useSelector((state)=>state.blog)
  const {usersFound} = useSelector((state)=>state.user)
  const {user} = useSelector((state)=>state.user)
  const {savedBlog} = useSelector((state)=>state.blog)
  
  return (
    <Stack direction={'row'}>
      <Box sx={{mt:'5rem', mx:'10%', width: '50%', mb:'3rem'}}>
        <Stack direction={'row'} sx={{mb:'3rem'}} spacing={1}>
          <Typography variant='h4' sx={{color:'grey', fontWeight:700}}>Results for</Typography>
          <Typography variant='h4' sx={{fontWeight:700}}>{q}</Typography>
        </Stack>
        <Stack direction={'row'} sx={{mb:'5px'}} spacing={1}>
          <Button onClick={()=>setTab('stories')}>Stories</Button>
          <Button onClick={()=>setTab('people')}>People</Button>
          <Button onClick={()=>setTab('category')}>category</Button>
        </Stack>
        <Divider sx={{mb:'2rem'}}></Divider>
        {tab === 'stories' ? (
          allBlog && allBlog.length>0 ? allBlog.map((blog)=> (
            <Story 
              key={blog._id}
              blogId = {blog._id}
              title ={blog.title}
              createdAt={blog.createdAt} 
              readingTime = {blog.readingTime}
              categories = {blog.category}
              likes = {blog.likedBy}
              comments = {blog.comments}
              photo={blog.photo}
              savedBlog = {savedBlog}
              content = {blog.content}
              ownerId={blog.userId._id}
              ownerName = {blog.userId.firstName + " "+blog.userId.lastName}
              ownerAvatar = {blog.userId.avatar}
            />
          )) : (<Typography variant='h6' >No blogs found for the search {q}</Typography>)
        ) : (null)}
        {tab === 'people' ? (
          usersFound && usersFound.length>0 ? usersFound.map((f)=>(
            <Follow id={f._id} isUser={true} userId={user._id} firstName={f.firstName} key={f._id} lastName={f.lastName} avatar={f.avatar} />
          )):(<Typography variant='h6' >No user found for the search {q}</Typography>)
        ):(null)}
        {tab === 'category' ? (
          category && category.length>0 ? category.map((item) =>(
            <Category key={item._id} name={item.name} />
            )) : (
              <Typography variant='p'>No category found for the search {q}</Typography>
            )
        ):(null)}
      </Box>
      <Divider variant='middle' orientation='vertical' className=' dark:bg-gray-800'></Divider>
      <Stack direction={'column'} width={'30%'} sx={{mt:'5rem', mr:'10%'}}>
        {tab!=='stories' ? (
          <Stack gap={2}>
          <Typography variant='p' sx={{fontWeight:'600'}}>Blog matching {q}</Typography>
          {allBlog && allBlog.length>0 ? allBlog.slice(0,3).map((blog)=> (
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
            ))
            :(<Typography variant='p'>No blog matching {q}</Typography>)}
          {allBlog && allBlog.length>0 ? (
          <>
            <Button variant='text' onClick={()=>setTab('stories')}>See more</Button>
            <Divider variant='middle'></Divider>
          </>
          ):(null)}
        </Stack>
        ):(null)}

        {tab!=='people' ? (
        <Stack m={1}>
          <Typography variant='p' sx={{fontWeight:'600'}}>Users matching {q}</Typography>
          {usersFound && usersFound.length>0 ? usersFound.slice(0,3).map((f)=>(
            <Follow id={f._id} isUser={true} userId={user._id} firstName={f.firstName} key={f._id} lastName={f.lastName} avatar={f.avatar} />
          )):(<Typography variant='h6' >No user matching {q}</Typography>)}
          {usersFound && usersFound.length>0 ? (
            <>
              <Button variant='text' onClick={()=>setTab('people')}>See more</Button>
              <Divider variant='middle'></Divider>
            </>
          ):(null)}
        </Stack>
        ):(null)}

        {tab!=='category' ? (
        <Stack m={1}>
          <Typography variant='p' sx={{fontWeight:'600'}}>Category matching with {q}</Typography>
          {category && category.length>0 ? category.slice(0,3).map((item) =>(
            <Category key={item._id} name={item.name} />
            )) : (
              <Typography variant='p'>No category found for the search {q}</Typography>
          )}
          {category && category.length>0 ? (
          
          <Button variant='text' onClick={()=>setTab('category')}>See more</Button>):(null)}
          
        </Stack>
        ):(null)}
      </Stack>
    </Stack>
  )
}

export default Search