import { Avatar, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const List = ({list, title}) => {
  const [isFriend, setIsFriend] = useState(false)
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false);
  };

  return (
        <Modal open={open} onClose={handleClose}>
            <Typography variant='h3' align='center' color={'gray'}>{title}</Typography>
            {list && list.length>0 ? (
              <Stack gap={2} spacing={2}> 
                  <Avatar
                      src={`http://localhost:8800/assets/${list.userId.avatar}`}
                      alt={list.userId.firstName.toUpperCase()}
                  />
                  <Typography varient='h6'>{list.userId.firstName} {list.userId.lastName}</Typography>
                  <Button variant='contained' sx={{display : (isFriend ? 'none':'block')}}>Follow</Button>
              </Stack>
            ):(
              <Typography variant='h4'>No likes to this Post!</Typography>
            )}
        </Modal>
  )
}

export default List