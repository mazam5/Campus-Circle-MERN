import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns';
import {BookmarkAdd, BookmarkAddOutlined,ThumbUp,ThumbUpOutlined} from '@mui/icons-material';
import UserImage from '../../utils/UserImage';
import parser from 'html-react-parser'
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { LikeBlog, bookmarkBlog, getBlogs, getFollowingBlogs, getPopularBlogs, getSavedBlogs, getSpecificBlog } from '../../../Actions/Blog';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

function extractTextFromHtml(html, wordLimit) {
  const sanitizedHTML = DOMPurify.sanitize(html);

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedHTML;

  const textContent = tempDiv.textContent || '';
    
  const words = textContent.split(' ');
  const initialWords = words.slice(0, wordLimit).join(' ');

  return initialWords;
}

  
const Story = ({ownerId, blogId, photo, savedBlog=[], likes=[], comments=[], content, title, categories, readingTime, createdAt, ownerName, ownerAvatar, blogFollowing = false}) => {
    const isSmallScreen = useMediaQuery('(max-width:400px)');
    const dispatch = useDispatch();
    const [time, setTime] = useState('');
    const [saveBlog, setSaveBlog] = useState('');
    const [liked, setLiked] = useState(false);
    const {user:me} = useSelector((state)=>state.user)

    useEffect(()=> {
        const timeFormat = (timestamp) => {
            const date = parseISO(timestamp);
            let formattedDate;
            {isSmallScreen? (
              formattedDate = format(date, "MMM dd")  
            ):(
              formattedDate = format(date, "MMM dd, yyyy")
            )}
            setTime(formattedDate)
        }
        timeFormat(createdAt)
    },[isSmallScreen])

    const handleLike = async(id) => {
        setLiked(!liked)
        await dispatch(LikeBlog(id))
        await dispatch(getFollowingBlogs())
        await dispatch(getSpecificBlog(id));
        dispatch(getBlogs())
      }
      
      const handleBookmark = async(id) => {
        setSaveBlog(!saveBlog)
        await dispatch(bookmarkBlog(id))
        dispatch(getBlogs())
        await dispatch(getSpecificBlog(id));
        dispatch(getSavedBlogs())
    }


    useEffect(() => {
        likes.forEach((item) => {
          if (item._id === me._id || item === me._id) {
            setLiked(true);
          }
        });
        
      }, [likes, me._id]);

      
    useEffect(() => {
        savedBlog.forEach((item) => {
          if (item._id === blogId) {
            setSaveBlog(true);
          }
        });
        
      }, [savedBlog, blogId]);

    const initialWords = extractTextFromHtml(content,30);


  return (
    <>
      <Box sx={{m:{xs:1, sm:3}}}>
          <Link to={`/user/${ownerId}`}>
              <Stack direction={'row'} width={'100%'} mb={1} gap={1}>
                  <UserImage image={ownerAvatar} firstName={ownerName} width={25} height={25}/>
                  <Typography fontWeight={'600'} variant='p'>{ownerName} </Typography>
                  <Typography variant='p'>{time}</Typography>
              </Stack>    
          </Link>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'column'} sx={{width:{xs:'100%', sm:'80%'}}} gap={1}>
              <Link to={`/blog/${blogId}`}>
                <Box sx={{ width: '150px', height: '150px' , display:{xs:'block', sm:'none'}, mx:'auto'}}>
                  <img src={`http://localhost:8800/assets/${photo}`} alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Typography fontWeight={'700'} variant='h5'>{title}</Typography>
                <Typography variant='p'>{parser(initialWords)}{ '...'}</Typography>
              </Link>
              <Stack direction={'row'} mt={3} justifyContent={isSmallScreen?'space-evenly':'space-between'}>
                  <Stack direction={'row'} gap={1} alignItems={'center'}>
                     <Link to={`/blog?category=${categories && categories.length>0? (categories[0]) : ('')}`}>
                      <Button variant='contained' sx={{borderRadius:'2rem', ":hover": {backgroundColor:'whitesmoke'}, maxWidth: 'fit-content', bgcolor:'lightgray', color:'black'}}>{categories && categories.length>0? (categories[0]) : (null)}</Button>
                     </Link>
                      <Typography variant='p'>{readingTime} min read</Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={1} >
                      <IconButton onClick={()=>handleLike(blogId)} >{liked ? <ThumbUp color='primary'/> : <ThumbUpOutlined/>}</IconButton>

                      <IconButton onClick={()=>handleBookmark(blogId)} >{saveBlog ? <BookmarkAdd color='primary'/> : <BookmarkAddOutlined/>}</IconButton>
                  </Stack>
              </Stack>
            </Stack>
            <Link to={`/blog/${blogId}`}>
            <Box sx={{ width: '150px', height: '150px' , display:{xs:'none', sm:'block'}}}>
                <img src={`http://localhost:8800/assets/${photo}`} alt="" style={{ width: '100%', height: '100%' }} />
            </Box>
            </Link>
          </Stack>
      </Box>
      <Divider variant="middle" className='dark:bg-gray-1'/>
    </>
  )
}

export default Story