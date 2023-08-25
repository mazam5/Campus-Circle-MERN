import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { LoadUser } from '../../Actions/User'
import { Box, Modal, Stack, Typography } from '@mui/material'
import Follow from './Follow'

const Followers = ({isUser = false, userId = null}) => {
  const [open, setOpen] = useState(false)

    // const dispatch = useDispatch()

  // useEffect(()=> {
  //     dispatch(LoadUser())
  // },[dispatch])

  const handleClose = () => {
    setOpen(false);
  }
  const {followers} = useSelector((state) => isUser ? state.userProfile.user : state.user.user);
  return (
    <>
    <Stack direction={'column'} >
        <button onClick={()=>setOpen(true)}>
            <Typography align='center' variant='h6'>Followers</Typography>
            <Typography align='center' variant='p'>{followers.length}</Typography>
        </button>
    </Stack>
    <Modal open={open} onClose={handleClose}>

    <Box m={3} sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 230, bgcolor: 'background.paper', boxShadow: 24, p: 2 }}>
        <Typography variant='h5'>Followers</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {followers && followers.length>0 ? (followers.map((f)=> (
          <Follow id={f._id} isUser={isUser} userId={userId} firstName={f.firstName} key={f._id} lastName={f.lastName} avatar={f.avatar} />
        ))):(
            <Typography align='center' m={2} variant='h6'>No followings yet!</Typography>
            )}
        </Box>
    </Box>
    </Modal>
</>
  )
}

export default Followers
