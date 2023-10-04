import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed, getMyPost, getUserPost, removeComment } from '../../Actions/Post'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';

const CommentComp = ({isUser, image, userId, commentId, postId, id, firstName, name, comment, isAccount}) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.user)
    
    const deleteComment = async() => {
        try {
          console.log(commentId)
          await dispatch(removeComment(postId, commentId))
          if(isAccount) {
            dispatch(getMyPost())
          }
          else if(isUser) {
            dispatch(getUserPost(id))
          }
          else {
            dispatch(getFeed())
          }
        } catch (error) {
          console.log(error) 
        }
      }
  return (
    <Stack gap={0} m={0} width={'100%'} direction={'row'}  spacing={2} > 
        <Link to={`/user/${userId}`}>
          <UserImage image = {image} firstName = {firstName} />
        </Link>
        <Stack direction={'row'} bgcolor={'whitesmoke'} width={'100%'}>
        <Box width={'100%'} >
          <Link to={`/user/${userId}`}>
              <Typography sx={{width:'fit-content', fontWeight:600}}>{name}</Typography>
          </Link>
          <Typography varient='h6' width={'100%'}>{comment}</Typography>
        </Box>
        {
          isAccount ? (
            <IconButton  sx={{m:0, p:1}} onClick={deleteComment}>
              <Delete fontSize={isSmallScreen ? 'small' : 'medium'} color='warning'/>
            </IconButton>
          ): (
          userId === user._id ? 
          (
            <IconButton sx={{m:0, p:1}} onClick={deleteComment}>
              <Delete fontSize={isSmallScreen ? 'small' : 'medium'} color='warning'/>
            </IconButton>
          )  
          : null) 
        }
        </Stack>
    </Stack>
  )
}

export default CommentComp