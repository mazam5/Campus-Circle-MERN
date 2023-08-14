import React from 'react'
import { LikePost } from '../../Actions/Post'
import { Button, Stack } from '@mui/material'
import {FavoriteBorder, Comment} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
const LikeComment = ({id}) => {
    const dispatch = useDispatch()
    const handleLike = () => {
        dispatch(LikePost(id))
      }
  return (
    <Stack p={2} justifyContent={'space-around'} direction={'row'} >
        <Button onClick={()=>handleLike(id)} startIcon={<FavoriteBorder />}>Like</Button>
        <Button startIcon={<Comment />}>comment</Button>
    </Stack> 
  )
}

export default LikeComment