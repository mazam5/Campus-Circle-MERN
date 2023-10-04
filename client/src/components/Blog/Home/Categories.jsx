import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {
  const [category, setCategory] = useState(null);
  useEffect(()=>  {
    const getCategory = async () => {
      const {data} = await axios.get('/category/');
      setCategory(data);
    }
    getCategory();
  },[])
  return (
    <Box width={'100%'} >
      <Typography variant='h6' >Categories</Typography>
      <Stack direction={'row'} width={'100%'} flexWrap={'wrap'} gap={1}>
        {category && category.length>0 ? category.slice(0,7).map((item) =>(
          <Category key={item._id} name={item.name} />
          )) : (
            <Typography variant='p'> No Categories Yet</Typography>
            )}

      </Stack>
        {category && category.length>0? (
          <Link to={'/categories'} >
            <Typography color={'darkgreen'} variant='p'>See more categories</Typography>
          </Link>
        ):(null)
        } 
    </Box>
  )
}

export default Categories