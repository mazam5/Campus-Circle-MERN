import { AttachFile, EmojiEmotions, SendRounded } from '@mui/icons-material'
import { Box, Button, Stack, TextField } from '@mui/material'
import React from 'react'

function Chat() {
  return (
    <Box height={'88vh'}>
      <Stack direction={'row'} height={'100%'} m={1}>
        <Box className='w-1/3'>
          contacts
        </Box>
        <Stack className='w-2/3 bg-blue-300' justifyContent={'space-between'} direction={'column'}>
          <Box>Please select user to see chats</Box>
          <Stack direction={'row'} alignItems={'center'} m={1}>

            <TextField
              flexGrow={'initial'}
              sx={{backgroundColor:'white'}}
              multiline
              minRows={1}
              maxRows={3}
              hiddenLabel
              placeholder="Enter text here"
              variant="outlined"
              fullWidth
              size='medium'
            />

            <Button><EmojiEmotions fontSize='large'/></Button>
            <Button><AttachFile fontSize='large'/></Button>
            <Button ><SendRounded fontSize='large'/></Button>

          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Chat