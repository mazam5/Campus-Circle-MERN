import React, { useEffect } from 'react'
import UserInfo from '../leftSidebar/UserInfo'
import FollowUsers from '../leftSidebar/FollowUsers'
// import Notify from '../rightSidebar/Notify'
import Followings from '../rightSidebar/Followings'
import CreatePost from '../Feed/CreatePost'
import Feed from '../Feed/Feed'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack, Typography } from '@mui/material'
import { getFeed } from '../../Actions/Post'

function Home() {
  
  const dispatch = useDispatch()
  const {feed} = useSelector((state)=> state.post)
  const {user} = useSelector((state)=> state.user)

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <>
    <Stack direction={'row'} bgcolor={"background.default"} color={"text.primary"} spacing={1} justifyContent={'space-between'} position={'fixed'} width={'100%'} height={'100%'} >
      <Stack position={'sticky'} direction={'column'} sx={{display:{xs:'none', sm:'block'}, flex:{sm: 0.2, md:0.5, lg:2}}} p={2} m={1} spacing={4}>
        <UserInfo />
        <FollowUsers />
      </Stack>
      <Box sx={{flex:{sm:4, md:4}}} pt={2} pb={5} overflow={'scroll'} >
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
                <Typography variant="h6" width={'100%'} m={2} align='center'>No posts yet</Typography>
                )
              }
      </Box>
      <Stack p={2} position={'sticky'} sx={{display:{xs:'none', md:'block'}, flex:{sm:1, md:1, lg:2}}} direction={'column'} >
        <Followings />
      </Stack>
    </Stack>
    </>
  )
}

export default Home




// import React, { useEffect } from 'react'
// import UserInfo from '../leftSidebar/UserInfo'
// import FollowUsers from '../leftSidebar/FollowUsers'
// import Notify from '../rightSidebar/Notify'
// import Friend from '../rightSidebar/Friend'
// import CreatePost from '../Feed/CreatePost'
// import Feed from '../Feed/Feed'
// import { useDispatch, useSelector } from 'react-redux'
// import { Box, Typography } from '@mui/material'
// import { getFeed } from '../../Actions/Post'

// function Home() {
  
//   const dispatch = useDispatch()
//   const {feed} = useSelector((state)=> state.post)
//   const {user} = useSelector((state)=> state.user)

//   useEffect(() => {
//     dispatch(getFeed());
//   }, [dispatch]);

//   return (
//     <Box className='flex flex-row w-full p-2 bg-violet-100 h-full'>
//       <Box className='flex-[0.25] '>
//         <UserInfo />
//         <FollowUsers />
//       </Box>
//       <Box className='flex-[0.45] mx-auto overflow-hidden overflow-y-auto h-full scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100'>
//         <CreatePost />
//         {
//           feed && feed.length>0 ? (
//             feed.map((f)=> (
//               <Feed 
//                 key={f._id}
//                 postId = {f._id}
//                 caption = {f.desc}
//                 postImage = {f.image}
//                 createdAt={f.createdAt}
//                 likes = {f.likes}
//                 comments = {f.comments}
//                 ownerId = {f.userId._id}
//                 ownerName = {f.userId.firstName + " "+f.userId.lastName}
//                 ownerAvatar = {f.userId.avatar}
//                 user={user} 
//               />

//             ))) : (
//               <Typography variant="h6" m={2} align='center'>No posts yet</Typography>
//             )
//         }
//       </Box>
//       <Box className='flex-[0.25]'>
//         <Notify/>
//         <Friend />
//       </Box>
//     </Box>
//   )
// }

// export default Home