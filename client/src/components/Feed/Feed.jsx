import React, { useEffect } from 'react'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button, Divider, Stack, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../Actions/Post';
import UserImage from '../utils/UserImage';
import LikeComment from './LikeComment';
import List from '../utils/List'
const Feed = () => {

  const dispatch = useDispatch()
    useEffect(()=> {
      dispatch(getFeed())
    },[dispatch])
    const {feed} = useSelector((state)=> state.post)
    const {likes} = useSelector((state)=> state)
    
    const handleClick = () => {
        <List list = {likes} title="Likes"/>
    }

  return (
    <>
    <div className='bg-red-50 p-3 '>
      {feed && feed.length>0 ? (feed.map((f)=>(
          <div className='mb-3 bg-red-100' key={f._id}>
            <div className='flex flex-row p-2'>
                  <div className='w-[6%] my-auto'>
                      <UserImage image = {f.userId.avatar} firstName={f.userId.firstName} />
                  </div>
                  <div className='w-[80%] pl-3 h-full mx-2'>
                      <h3 className='flex text-opacity-25 flex-col text-[16px]'>{f.userId.firstName} {f.userId.lastName}</h3>
                      <span className='text-sm'>{new Date(f.updatedAt).toLocaleString()}</span>
                  </div>
                  <div className='w-[10%]'>
                      <button className='w-full h-full mx-auto my-auto'>
                          <PersonRemoveIcon />    
                      </button>
                  </div>
            </div>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <div className='desc p-3 pt-2'>{f.desc}</div>
            <div className="flex w-full h-64 bg-red-200">
              <img src={`http://localhost:8800/assets/${f.image}`} alt="postImage" className="object-contain w-full h-full" />
            </div>
            <Stack justifyContent={'space-between'} px={3} py={2} direction={'row'} className=' p-3 engage flex flex-row justify-between'>
              <Button onClick={handleClick} variant='text'><ThumbUpIcon  /> {f.likes.length} likes</Button>
              <Button variant='text'>{f.comments.length} comments</Button>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <LikeComment id = {f._id}/>
          </div>
      ))):(
        <Typography variant='h6' align='center' >No posts yet!</Typography >
      )}
      
      </div>
    </>
  )
}

export default Feed