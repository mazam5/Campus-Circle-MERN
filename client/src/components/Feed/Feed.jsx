import React, { useEffect, useState } from 'react'
import { Button, Divider, Stack, Typography, Modal, Box, TextField, Card, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LikePost, addComment, getFeed, getMyPost, getUserPost } from '../../Actions/Post';
import { Comment, CommentOutlined, EmojiEmotions, Favorite, FavoriteBorder, Send } from '@mui/icons-material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Friend from '../utils/Friend';
import Like from './Like';
import CommentComp from './CommentComp';

const Feed = ({
  postId, caption, postImage, createdAt, likes = [], comments = [], ownerId, ownerName, ownerAvatar, isDelete = false, isAccount= false, user, isUser = false
}) => {
  const [open, setOpen] = useState(false)
  const [commentToggle, setCommentToggle] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState("") 
  const [openComment, SetOpenComment] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const {user:me} = useSelector((state)=>state.user)

  const dispatch = useDispatch()
    
    const handleLike = async(id) => {
      setLiked(!liked)
      await dispatch(LikePost(id))
      if(isAccount) {
        dispatch(getMyPost())
      }
      else if(isUser) {
        dispatch(getUserPost(user._id))
      } 
      else{
        dispatch(getFeed())
      } 
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
        if (item._id === me._id) {
          setLiked(true);
        }
      });
    }, [likes, me._id]);

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
        if(isAccount) {
          dispatch(getMyPost())
        }
        else if(isUser) {
          dispatch(getUserPost(user._id))
        }
        else{
          dispatch(getFeed())
        } 
        SetOpenComment(!openComment)
        setComment("")
      } catch (error) {
        console.log(error) 
      }
    }

  return (
    <>
    <Card sx={{m:{xs:'1rem', md:'10px', lg:'2rem'}}} >
      <Friend isUser={isUser} ownerAvatar={ownerAvatar} postId = {postId} caption={caption} postImage = {postImage} createdAt = {createdAt} friendId={ownerId} ownerName={ownerName} />

      <Divider variant="middle" className='dark:bg-gray-100'/>
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
      <Divider variant="middle" className='dark:bg-gray-100'/>
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
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: {xs: 300, sm:600}, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: {xs:1, sm:2} }}>

              <Typography variant='h5' align='center' color={'gray'} m={1}>Likes</Typography>
              <Divider variant="middle" className='dark:bg-gray-300'/>

              <Box sx={{ maxHeight: '220px', overflowY: 'scroll' }}>
              { likes && likes.length>0 ? likes.map((l) =>(
                  <Container sx={{mt:1}} key={me._id}>
                    <Like key={me._id} ownerAvatar={l.avatar} ownerName={l.firstName +" "+ l.lastName} friendId={l._id} />
                  </Container> 
                  )):(
                    <Typography variant='h6' m={2} >No likes yet!</Typography>
                    )
              }
              </Box>
            </Box>
          </Modal>
          <Modal open={commentToggle} onClose={handleCloseComment}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: {xs: 300, sm:600}, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>

              <Typography variant='h5' align='center' color={'gray'} m={1}>Comments</Typography>
              <Divider variant="middle" className='dark:bg-gray-300'/>
              <Box sx={{ maxHeight: '220px', overflowY: 'scroll' }}>
              { comments && comments.length>0 ? comments.map((comment) =>(
                  <Container sx={{margin:{xs:0, md:3}, marginTop:{xs:2}}} key={comment._id} overflow={'hidden'} >
                    <CommentComp isUser={isUser} key={comment._id} isAccount={isAccount} userId = {comment.user._id} id ={user._id} image = {comment.user.avatar} postId = {postId} commentId = {comment._id} firstName ={comment.user.firstName} name = {comment.user.firstName+ " "+comment.user.lastName} comment= {comment.comment} />
                  </Container>
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

