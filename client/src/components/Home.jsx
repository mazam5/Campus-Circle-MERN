import React from 'react'
import UserInfo from './leftSidebar/UserInfo'
import FollowUsers from './leftSidebar/FollowUsers'
import Notify from './rightSidebar/Notify'
import Friend from './rightSidebar/Friend'
import CreatePost from './Feed/CreatePost'
import Feed from './Feed/Feed'

function Home() {

  return (
    <div className='flex flex-row w-full p-2 bg-violet-100 h-full'>
      <div className='flex-[0.25] '>
        <UserInfo />
        <FollowUsers />
      </div>
      <div className='flex-[0.35] mx-auto overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
        <CreatePost />
        <Feed/>
      </div>
      <div className='flex-[0.25]'>
        <Notify/>
        <Friend />
      </div>
    </div>
  )
}

export default Home