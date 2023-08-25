import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Divider, Stack, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import Modal from './UserModal'
import UserImage from '../utils/UserImage';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const {user} = useSelector((state) => state.user)
  return (
    <Box  className='bg-orange-200'>
        <Stack direction={'row'} gap={1} p={2} alignItems={'center'}>
            <UserImage image={user.avatar} firstName={user.firstName} />
            <Stack direction={'column'} width={'100%'}>
                <Link to={`/user/${user._id}`}>

                <Typography variant='h6'>{user.firstName} {user.lastName} <VerifiedIcon/></Typography>
                </Link>
                <Typography variant='p' >{user.followers.length} Followers</Typography>
            </Stack>
            <Modal />
        </Stack>
        <Divider variant="middle" className='dark:bg-gray-800'/>
        <Stack direction={'column'} p={2} gap={1}>
            <Typography variant='p'><LocationOnIcon/>{user.location}</Typography>
            <Typography variant='p'><WorkIcon />{user.occupation}</Typography>
        </Stack>
        <Divider variant="middle" className='dark:bg-gray-800'/>
        <Stack direction={'column'} p={2} gap={1}>
            <Typography variant='p'><PeopleIcon/>Following: {user.following.length}</Typography>
            <Typography variant='p'><VisibilityIcon />Viewed Profiles: {user.viewedProfiles}</Typography>
        </Stack>
    </Box>
  )
}

export default UserInfo