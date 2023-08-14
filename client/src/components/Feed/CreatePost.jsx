import React, { useState, useRef } from 'react'
import { Box, Divider, Modal, Stack, Card, Typography, Button, TextField} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DuoIcon from '@mui/icons-material/Duo';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from 'react-redux';
import UserImage from '../utils/UserImage';
import { createPost, getFeed } from '../../Actions/Post';
// import profile from '../../assets/post.jpg'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { AttachFile, Edit, EmojiEmotions, VideoCameraBack } from '@mui/icons-material';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const CreatePost = () => {
  const [desc, setDesc] = useState("")
  const [showEmoji, setShowEmoji] = useState(false)
  const [image, setImage] = useState("")
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.user)
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  const inputFileRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreatePost = () => {
    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('userId', user._id)
    if(image) {
      // formData.append('picture', )
      // formData.append('image', image)
      formData.append('picture', image);
      formData.append('image', image.name)
    }
    dispatch(createPost(formData))
    dispatch(getFeed())
    handleClose()
  }

  const addEmoji = (e) => {
    const sys = e.unified.split("_")
    const codeArray = []
    sys.forEach((ele)=> codeArray.push("0x"+ele))
    let emoji = String.fromCodePoint(...codeArray)
    setDesc(desc + emoji)
  }

  const handleAddPhoto = (e) => {
    e.preventDefault();
    // Click the hidden input element when the icon is clicked
    inputFileRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
    const Reader = new FileReader();
    Reader.readAsDataURL(selectedFile);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProfile(Reader.result);
      }
    };
  };

  const handleEdit = () => {
    setImage(null)
  }

  return (
    <div className='mt-2 mb-3 w-full h-1/5 bg-slate-200'>
      <div className='p-3 h-[60%] flex'>
        <div className='w-[10%] my-auto'>
            <UserImage image={user.avatar} firstName={user.firstName} />
        </div>
        <div className='w-full my-auto' onClick={handleClickOpen}>
          <textarea type="text" placeholder="What's on you mind?" className='px-3 my-auto outline-none bg-white rounded-full w-full' disabled/>
        </div>
      </div>
      <Divider variant="middle" className='dark:bg-gray-800'/>
      <div className='flex h-[40%] px-8 justify-between'>
        <Button onClick={handleClickOpen} startIcon={<AddAPhotoIcon/>}>Photo</Button>
        <Button onClick={handleClickOpen} startIcon={<DuoIcon/>}>Video</Button>
        <Button onClick={handleClickOpen} startIcon={<ArticleIcon/>}>Blog</Button>
      </div>
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: ( image ? 525 : 300), bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant='h6' color={'gray'} align='center'>Create Post</Typography>
        <TextField
          multiline
          rows={2}
          margin='dense'
          variant="standard"
          fullWidth
          placeholder={`What's on your mind? ${user.firstName}`}
          value={desc}
          onChange={(e)=> setDesc(e.target.value)}
        />
        <Box sx={{ display: (image ? 'block' : 'none'), marginTop:2}}>
          <Card sx={{margin: 'auto', minWidth: 100, outline:"none", maxWidth: 500, maxHeight:250}}>
              <img src={profile} loading="lazy" alt="" />
          </Card>
        </Box>
        <Stack direction="row" gap={2} mt={2} mb={3}>
          <EmojiEmotions color='primary' onClick={()=>setShowEmoji(!showEmoji)}/>
          
          <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleImageFileChange}/>

          <AddPhotoAlternateIcon color= 'secondary' onClick={handleAddPhoto} />
          <AttachFile color='error'/>
          <VideoCameraBack color='success'/>

          <Edit sx={{display: (image?'block':'none')}} color='warning' onClick={handleEdit}/>
        </Stack>
        {showEmoji &&
          <Picker 
            data={data} 
            onEmojiSelect={addEmoji}
          />
        }
        <Button onClick={handleCreatePost} fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Post
        </Button>
      </Box>
    </Modal>
    </div>
  )
}

export default CreatePost