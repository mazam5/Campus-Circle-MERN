import { Box, Typography } from '@mui/material'
import React from 'react'
// import video from ''
const Loader = () => {
  return (
    <Box sx={{position:'absolute', top:'50%', left:'50%', backgroundColor:'white'}}>
      {/* <video src={video} width={100} height={100} loop mute>hey</video> */}
      <Typography>Loading</Typography>
    </Box>
  )
}

export default Loader