import React, { useEffect } from 'react'
import Profile from '../../assets/profile.jpg'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../Actions/Post';

const Feed = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getFeed())
  },[dispatch])
  
  const {feed} = useSelector((state)=> state.post)
  return (
    <>
    <div className='bg-red-50 p-3 '>
      {feed && feed.map((f)=>(
          <div className='mb-3 bg-red-100' key={f._id}>
            <div className='flex flex-row p-2'>
                  <div className='w-[6%] my-auto'>
                      <img className='rounded-[100%]' src={Profile} width={50} alt="profile" />
                  </div>
                  <div className='w-[80%] h-full mx-2'>
                      <h3 className='flex text-opacity-25 flex-col text-[16px]'>Name</h3>
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
              <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' alt="postImage" className="object-contain w-full h-full" />
            </div>
            <div className=' p-3 engage flex flex-row justify-between'>
              <div><ThumbUpIcon /> {f.likes.length}</div>
              <div>{f.comments.length} comments</div>
            </div>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <div className='flex flex-row p-3 justify-between'>
              <button><FavoriteBorderIcon />Like</button>
              <button><CommentIcon />comment</button>
            </div> 
          </div>
      ))}
      
      </div>
    </>
  )
}

export default Feed