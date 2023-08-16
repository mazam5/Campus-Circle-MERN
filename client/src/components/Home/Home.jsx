import React, { startTransition, useEffect } from 'react'
import UserInfo from '../leftSidebar/UserInfo'
import FollowUsers from '../leftSidebar/FollowUsers'
import Notify from '../rightSidebar/Notify'
import Friend from '../rightSidebar/Friend'
import CreatePost from '../Feed/CreatePost'
import Feed from '../Feed/Feed'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { getFeed } from '../../Actions/Post'

function Home() {
  
  const dispatch = useDispatch()
  const {feed} = useSelector((state)=> state.post)
  const {user} = useSelector((state)=> state.user)

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <div className='flex flex-row w-full p-2 bg-violet-100 h-full'>
      <div className='flex-[0.25] '>
        <UserInfo />
        <FollowUsers />
      </div>
      <div className='flex-[0.45] mx-auto overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
        <CreatePost />
        {
          feed && feed.length>0 ? (
            feed.map((f)=> (
              <Feed 
                key={f._id}
                postId = {f._id}
                caption = {f.desc}
                postImage = {f.image}
                createdAt={f.createdAt}
                likes = {f.likes}
                comments = {f.comments}
                ownerId = {f.userId._id}
                ownerName = {f.userId.firstName + " "+f.userId.lastName}
                ownerAvatar = {f.userId.avatar}
                user={user} 
              />

            ))) : (
              <Typography variant="h6" m={2} align='center'>No posts yet</Typography>
            )
        }
      </div>
      <div className='flex-[0.25]'>
        <Notify/>
        <Friend />
      </div>
    </div>
  )
}

export default Home