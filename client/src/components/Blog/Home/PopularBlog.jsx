import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import UserImage from '../../utils/UserImage'

const PopularBlog = ({ownerAvatar, category, blogId, ownerId, firstName, lastName, title}) => {
  return (
    <Box mx={1}>
        <Link to={`/user/${ownerId}`}>
            <Stack direction={'row'} mb={1} gap={0.5}>
                <UserImage image={ownerAvatar} width={25} height={25} firstName={firstName}/>
                <Typography ml={1} fontWeight={'625'} variant='p'>{firstName} {lastName} </Typography>
                <Typography variant='p' >in</Typography>
                <Typography fontWeight={'625'} variant='p'> {category[0]}</Typography>
            </Stack>
        </Link>
        <Link to={`/blog/${blogId}`}>
            <Typography fontWeight={'800'} variant='p'>{title}</Typography>
        </Link>
    </Box>
  )
}

export default PopularBlog