import React, { useEffect, useState } from 'react'
import { Button, Divider, Stack, Typography, Modal, Box, TextField, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { LikePost, addComment, getFeed } from '../../Actions/Post';
import { Comment, CommentOutlined, EmojiEmotions, Favorite, FavoriteBorder, Send } from '@mui/icons-material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Friend from '../utils/Friend';
import Like from './Like';
import CommentComp from './CommentComp';

const Feed = ({
  postId, caption, postImage, createdAt, likes = [], comments = [], ownerId, ownerName, ownerAvatar, isDelete = false, isAccount= false, user
}) => {
  const [open, setOpen] = useState(false)
  const [commentToggle, setCommentToggle] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("") 
  const [openComment, SetOpenComment] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const dispatch = useDispatch()
    
    const handleLike = async(id) => {
      setLiked(!liked)
      await dispatch(LikePost(id))
      dispatch(getFeed())
    }
    
    const addEmoji = (e) => {
      const sys = e.unified.split("_")
      const codeArray = []
      sys.forEach((ele)=> codeArray.push("0x"+ele))
      let emoji = String.fromCodePoint(...codeArray)
      setComment(comment + emoji)
    }  

    useEffect(() => {
      likes.forEach((item) => {
        if (item._id === user._id) {
          setLiked(true);
        }
      });
    }, [likes, user._id]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleOpenComment = () => {
      setCommentToggle(true)
    }
    
    const handleCloseComment = () => {
      setCommentToggle(false)
    };

    const handleClose = () => {
      setOpen(false)
    };
  
    const AddComment = async() => {
      try {
        await dispatch(addComment(postId, comment))
        dispatch(getFeed())
        SetOpenComment(!openComment)
        setComment("")
      } catch (error) {
        console.log(error) 
      }
    }

  return (
    <>
    <Card sx={{bgcolor:'lightgrey', m:'2rem'}} >
            <Friend ownerAvatar={ownerAvatar} createdAt = {createdAt} friendId={ownerId} ownerName={ownerName} />

            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Box p={1} >
              <Typography variant='p'>{caption}</Typography>
            </Box>
            <Box m={1} display={ postImage ? 'block' : 'none'}>
              <img src={`http://localhost:8800/assets/${postImage}`} alt="postImage" width={'100%'} />
            </Box>
            <Stack justifyContent={'space-between'} px={3} py={2} direction={'row'} className=' p-3 engage flex flex-row justify-between'>

              <Button onClick={handleClickOpen} variant='h6'>{likes.length} likes</Button>
              <Button onClick={handleOpenComment} variant='h6'>{comments.length} comments</Button>
            </Stack>
            <Divider variant="middle" className='dark:bg-gray-300'/>
            <Stack p={2} justifyContent={'space-around'} direction={'row'} >
                <Button onClick={()=>handleLike(postId)} >{liked ? <Favorite color='error'/> : <FavoriteBorder/>}</Button>
                <Button onClick={()=> SetOpenComment(!openComment)} >{openComment ? <CommentOutlined /> : <Comment /> }</Button>
            </Stack> 
            <Stack direction={'row'} my={'auto'} gap={1} sx={{width:'100%' ,display:(openComment ? 'block':'none'), height:'4rem'}}>
              <TextField
                multiline
                variant="standard"
                height='100%'
                placeholder={"Add a comment..."}
                value={comment}
                maxRows={2}
                onChange={(e)=> setComment(e.target.value)}
                sx={{paddingY:"auto", marginLeft:'2rem', width:'70%'}} 
              />
              <EmojiEmotions color='primary' sx={{my:"auto"}} onClick={()=>{setShowEmoji(!showEmoji);}}/>
              <Button onClick={AddComment}><Send/></Button>
            </Stack>
          <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>

              <Typography variant='h5' align='center' color={'gray'} m={1}>Likes</Typography>
              <Divider variant="middle" className='dark:bg-gray-300'/>

              <Box sx={{ maxHeight: '220px', overflowY: 'scroll' }}>
              { likes && likes.length>0 ? likes.map((l) =>(
                  <Box m={3} key={l.userId}>
                    <Like ownerAvatar={l.avatar} ownerName={l.firstName +" "+ l.lastName} friendId={l._id} />
                  </Box> 
                  )):(
                    <Typography variant='h6' m={2} >No likes yet!</Typography>
                    )
                  }
              </Box>
            </Box>
          </Modal>
          <Modal open={commentToggle} onClose={handleCloseComment}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>

              <Typography variant='h5' align='center' color={'gray'} m={1}>Comments</Typography>
              <Divider variant="middle" className='dark:bg-gray-300'/>
              <Box sx={{ maxHeight: '220px', overflowY: 'scroll' }}>
              { comments && comments.length>0 ? comments.map((comment) =>(
                  <Box m={3} key={comment._id} overflow={'hidden'} >
                    <CommentComp userId = {comment.user._id} image = {comment.user.avatar} postId = {postId} commentId = {comment._id} firstName ={comment.user.firstName} name = {comment.user.firstName+ " "+comment.user.lastName} comment= {comment.comment} />
                  </Box>
                  )):(
                    <Typography variant='h6' m={2} >No comments yet!</Typography>
                  )
                }
                </Box>
            </Box>
          </Modal>
          {showEmoji && (
              <div className="absolute bottom-[1%] right-[22%]">
                <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                />
              </div>
            )}
      </Card>
    </>
  )
}

export default Feed

