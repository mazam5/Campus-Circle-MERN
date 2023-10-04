import { Box, Typography,InputBase, IconButton, Fab, Paper, Stack, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Clear } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './explore.css'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRef } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: '10px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'whitesmoke',
    '&:hover': {
      backgroundColor: 'whitesmoke',
    },
    color:'black',
    marginLeft: 0,
    borderRadius: '50px',
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '55ch',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      width: '35ch',
    },

  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '40ch',
      },
      // [theme.breakpoints.down('sm')]: {
      //   width: '20ch',
      // },
    },
  }));

const ExploreCategory = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  useEffect(()=>  {
    const getCategory = async () => {
      const {data} = await axios.get('/category');
      setCategory(data);
    }
    getCategory();
  },[])

  const handleEnterKeyPress = (event) => {
    const trimmed = search.trim()
    if (event.key === 'Enter' && trimmed!='') {
      navigate(`/search?search=${search}`);
    }
  };

  const handleSearch = () => {
    const trimmed = search.trim()
    if(trimmed!='') {
      navigate(`/search?search=${search}`);
    }
    else {
      alert('input cannot be an empty string')
    }
  }
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollContainer = scrollContainerRef.current;
    const scrollAmount = 200;

    if (scrollContainer) {
      const isAtLeftExtreme = scrollContainer.scrollLeft <= 2;
      const isAtRightExtreme = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;

    setShowLeftArrow(!isAtLeftExtreme);
    setShowRightArrow(!isAtRightExtreme);

      if (direction === 'left') {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft - scrollAmount,
          behavior: 'smooth', // Enable smooth scrolling
        });
      } else if (direction === 'right') {
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft + scrollAmount,
          behavior: 'smooth', // Enable smooth scrolling
        });
      }
    }
  };

  return (
    <>
    <Box mt={'3rem'} display={'flex'} justifyContent={'center'}>
        <Box sx={{width:{xs:'100%',md:'70%'}, justifyContent:'center', display:'flex', flexDirection:'row'}}>
          <IconButton sx={{":hover": {backgroundColor:'white'}}} style={{ display: showLeftArrow ? 'block' : 'none' }} onClick={() => handleScroll('left')}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Stack gap={2} p={3} ref={scrollContainerRef} direction={'row'} sx={{overflowX:'scroll',borderRadius:'40px'}}>
            

            <Fab variant='extended' sx={{minWidth:'7rem'}} size='string' >
              <ExploreRoundedIcon />
              Explore topic
            </Fab>

            {category && category.length>0 ? category.map((item, index) =>(
              <Link key={index} to={`/blog?category=${item.name}`}>
                  <Fab key={index} size='string' variant='extended'>{item.name}</Fab>
              </Link>
            )) : (null)}

          </Stack>
            <IconButton sx={{":hover": {backgroundColor:'white'}}} style={{ display: showRightArrow ? 'block' : 'none' }} onClick={() => handleScroll('right')}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
        </Box>
    </Box>

      <Box mt={'2rem'} display={'flex'} justifyContent={'center'}>
          <Typography variant='h4' sx={{fontWeight:600}}>Explore topics</Typography>
      </Box>
      <Box mt={5} display={'flex'} justifyContent={'center'}>
      <Search >
          <SearchIconWrapper>
            <SearchIcon fontSize='large' sx={{fontWeight:200, color:'darkgrey'}}/>
          </SearchIconWrapper>
          <StyledInputBase
            required
            placeholder="Search all categories"
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
            endAdornment={
              search !== '' && (
                <IconButton onClick={()=>setSearch('')}>
                  <Clear />
                </IconButton>
              )
            }
            onKeyDown={handleEnterKeyPress}
            />
        </Search>
        <Fab onClick={handleSearch} sx={{ml:2, mt:0.5, display:'flex', alignItems:'center'}} size='medium'>
            <SearchIcon fontSize='medium'/>
          </Fab>
      </Box>
    </>
  )
}

export default ExploreCategory