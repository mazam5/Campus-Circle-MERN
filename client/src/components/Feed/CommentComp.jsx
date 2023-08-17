import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeed, removeComment } from '../../Actions/Post'
import { Box, Button, Stack, Typography } from '@mui/material'
import UserImage from '../utils/UserImage'
import { Delete } from '@mui/icons-material'

const CommentComp = ({image, userId, commentId, postId, firstName, name, comment}) => {
    const dispatch = useDispatch()
    const deleteComment = async() => {
        try {
          console.log(commentId)
          await dispatch(removeComment(postId, commentId))
          dispatch(getFeed())
        } catch (error) {
          console.log(error) 
        }
      }
    const {user} = useSelector((state)=> state.user)
  return (
    <Stack gap={2} direction={'row'}  spacing={2} > 
        <UserImage image = {image} firstName = {firstName} />
        <Box bgcolor={'whitesmoke'} width={'100%'}>
            <Typography varient='h1' sx={{fontWeight: 800}} width={'60%'}>{name}</Typography>
            <Typography varient='h6' width={'100%'}>{comment}</Typography>
        </Box>
        {
          userId === user._id ? 
          (
            <Button onClick={deleteComment}>
              <Delete color='warning'/>
            </Button>
          )  
          : null 
        }
    </Stack>
  )
}

export default CommentComp