import { Box, Stack, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import UserImage from '../../utils/UserImage';

const SavedBlog = ({firstName, blogId, lastName, categories, title, ownerAvatar, ownerId, readingTime, createdAt}) => {
  const [time, setTime] = useState('');

    useEffect(()=> {

        const timeFormat = (timestamp) => {
            const date = parseISO(timestamp);
            const formattedDate = format(date, "MMM dd");
            setTime(formattedDate)
        }
        timeFormat(createdAt)
    },[])
  return (
        <Box m={1}>
          <Link to={`/user/${ownerId}`}>
              <Stack direction={'row'} mb={1} gap={0.5}>
                  <UserImage image={ownerAvatar} width={25} height={25} firstName={firstName}/>
                  <Typography ml={1} fontWeight={'625'} fontSize={'15px'} variant='p'>{firstName} {lastName} </Typography>
                  <Typography variant='p' fontSize={'15px'}>in</Typography>
                  <Typography fontWeight={'625'} fontSize={'15px'} variant='p'> {categories[0]}</Typography>
              </Stack>
          </Link>   
          <Link to={`/blog/${blogId}`}>
            <Typography fontWeight={'700'} variant='p'>{title}</Typography>
            <Stack direction={'row'} mt={1} gap={1}>
                <Typography variant='p'>{time}</Typography>
                <Typography variant='p'>{readingTime} min</Typography>
            </Stack>
          </Link>
        </Box>
  )
}

export default SavedBlog