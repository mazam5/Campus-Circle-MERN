import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { LoadUser } from '../../Actions/User'
import { Box, Modal, Stack, Typography } from '@mui/material'

import Following from '../rightSidebar/Following'

const Followings = ({isUser = false}) => {
  const [open, setOpen] = useState(false)
    // const dispatch = useDispatch()

    
  // useEffect(()=> {
  //     dispatch(LoadUser())
  // },[dispatch])

  const handleClose = () => {
    setOpen(false);
  }
  
  const {following} = useSelector((state) => isUser ? state.userProfile.user : state.user.user);

  return (
    <>
    <Stack direction={'column'} >
        <button onClick={()=> setOpen(true)}>
            <Typography align='center' variant='h6'>Following</Typography>
            <Typography align='center' variant='p'>{following.length}</Typography>
        </button>
    </Stack>
    <Modal open={open} onClose={handleClose}>
        
    <Box m={3} maxHeight={'220px'} sx={{ position: 'absolute', top: '50%', left: '50%', outline:'none', border:'none', transform: 'translate(-50%, -50%)', width: 600, height: 300, bgcolor: 'background.paper', boxShadow: 24, p: 2 }} >
        <Typography variant='h5'>Following</Typography>
        <Box sx={{ maxHeight: '180px', overflowY: 'scroll' }}>
        {following && following.length>0 ? (following.map((f)=> (
            <Following isUser={isUser} key={f._id} avatar = {f.avatar} id = {f._id} firstName = {f.firstName} lastName = {f.lastName} />
        ))):(
            <Typography align='center' m={2} variant='h6'>No followings yet!</Typography>
            )}
        </Box>
    </Box>
</Modal>
</>
  )
}

export default Followings
