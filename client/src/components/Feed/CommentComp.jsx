import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed, getMyPost, getUserPost, removeComment } from '../../Actions/Post'
import { Box, Button, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const CommentComp = ({isUser, image, userId, commentId, postId, id, firstName, name, comment, isAccount}) => {
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
    <Stack gap={2} m={2} direction={'row'}  spacing={2} > 
        <Link to={`/user/${userId}`}>
          <UserImage image = {image} firstName = {firstName} />
        </Link>
        <Box bgcolor={'whitesmoke'} width={'100%'}>
          <Link to={`/user/${userId}`}>
              <Typography varient='h1' sx={{fontWeight: 800}} width={'60%'}>{name}</Typography>
          </Link>
          <Typography varient='h6' width={'100%'}>{comment}</Typography>
        </Box>
        {
          isAccount ? (
            <Button onClick={deleteComment}>
              <Delete color='warning'/>
            </Button>
          ): (
          userId === user._id ? 
          (
            <Button onClick={deleteComment}>
              <Delete color='warning'/>
            </Button>
          )  
          : null) 
        }
    </Stack>
  )
}

export default CommentComp