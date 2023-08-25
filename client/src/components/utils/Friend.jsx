import { Box, Button, Card, IconButton, Menu, MenuItem, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, {useRef, useState} from 'react'
import UserImage from './UserImage'
import { useDispatch, useSelector } from 'react-redux'
import { PersonAddOutlined, Edit, PersonRemoveOutlined, AddPhotoAlternate, MoreHorizOutlined,UpdateOutlined, Delete, EmojiEmotions } from '@mui/icons-material'
import { LoadUser, addRemoveUser, getUserProfile, toFollow } from '../../Actions/User'
import { deletePost, getFeed, getMyPost, updatePost } from '../../Actions/Post'
import { Link } from 'react-router-dom'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Friend = ({ isUser, ownerAvatar, friendId, ownerName, createdAt, postId, caption, postImage}) => {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [open, setOpen] = useState(false);
    const [desc, setDesc] = useState(caption)
    const [showEmoji, setShowEmoji] = useState(false)
    const [img, setImg] = useState("")
    const [profile, setProfile] = useState(postImage);
    const inputFileRef = useRef(null);
    const {user} = useSelector((state) => state.user) 
    const isFriend = user.following.find((friend) => friend._id === friendId);

    const addEmoji = (e) => {
      const sys = e.unified.split("_")
      const codeArray = []
      sys.forEach((ele)=> codeArray.push("0x"+ele))
      let emoji = String.fromCodePoint(...codeArray)
      setDesc(desc + emoji)
    }
  
    const handleAddPhoto = (e) => {
      e.preventDefault();
      inputFileRef.current.click();
    };
  
    const handleImageFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setImg(selectedFile);
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
      setImg(null)
    }

    const dispatch = useDispatch()
    const handleFollowUnfollow = async() => {
        await dispatch(addRemoveUser(friendId));
        if(isUser) {
          await dispatch(getUserProfile(friendId))
        }
        else {
          await dispatch(getFeed())
          await dispatch(toFollow())
        }
        dispatch(LoadUser())
    }
    
    const handleDelete = async() => {
        await dispatch(deletePost(postId))
        dispatch(getMyPost())
    }

    const handleUpdate = async() => {
      const formData = new FormData();
      formData.append('desc', desc)
      formData.append('userId', friendId)
      if(img) {
        formData.append('picture', img);
        formData.append('image', img.name)
      }
      await dispatch(updatePost(postId, formData))
      handleClose()
      dispatch(getMyPost())
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleClick = () => {
        setOpen(true);
        handleCloseUserMenu()
      }
      const handleClose = ()=> {
        setOpen(false)
      }

  return (
    <Stack direction={'row'} gap={2} p={2} alignItems={'center'}>
        <UserImage image = {ownerAvatar} firstName={ownerName} />
        <Stack direction={'column'} sx={{width: "80%"}}>
            <Link to={`/user/${friendId}`}>
                <Typography variant='h6'> {ownerName} </Typography>
            </Link>
            <Typography variant='p'>{new Date(createdAt).toLocaleString()}</Typography>
        </Stack>
        {friendId !== user._id ? (
            <Button onClick={handleFollowUnfollow} >
                {isFriend ? (
                <PersonRemoveOutlined  />
                ) : (
                <PersonAddOutlined  />
                )}
            </Button>
        ) : (
          <>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreHorizOutlined />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                <MenuItem onClick = {handleClick}>
                    <Typography textAlign="center"><UpdateOutlined/> Update Post</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <Typography textAlign="center"><Delete color='error'/> Delete Post</Typography>
                </MenuItem>
              </Menu>
            </Box>  
            <Modal open={open} onClose={handleClose}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: ( img ? 525 : 300), bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant='h6' color={'gray'} align='center'>Update Post</Typography>
                <TextField
                  multiline
                  rows={2}
                  margin='dense'
                  variant="standard"
                  fullWidth
                  value={desc}
                  onChange={(e)=> setDesc(e.target.value)}
                  />
                <Box sx={{ display: (img ? 'block' : 'none'), marginTop:2}}>
                  <Card sx={{margin: 'auto', minWidth: 100, outline:"none", maxWidth: 500, maxHeight:250}}>
                      <img src={profile} loading="lazy" alt="" />
                  </Card>
                </Box>
                <Stack direction="row" gap={2} mt={2} mb={3}>
                  <EmojiEmotions color='primary' onClick={()=>setShowEmoji(!showEmoji)}/>
                  
                  <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleImageFileChange}/>

                  <AddPhotoAlternate color= 'secondary' onClick={handleAddPhoto} />

                  <Edit sx={{display: (img?'block':'none')}} color='warning' onClick={handleEdit}/>
                </Stack>
                {showEmoji &&
                  <Picker 
                  data={data} 
                  onEmojiSelect={addEmoji}
                  />
                }
                <Button onClick={handleUpdate} fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                  Update
                </Button>
              </Box>
            </Modal>
        </>
        ) }
    </Stack>
  )
}

export default Friend