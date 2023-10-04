import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({name}) => {
  return (
    <Stack p={1}>
      <Link to={`/blog?category=${name}`}>
        <Button variant='outlined'>{name}</Button>
      </Link>
    </Stack>
  )
}

export default Category