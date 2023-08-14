import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import Modal from './UserModal'
import UserImage from '../utils/UserImage';

const UserInfo = () => {
    const {user} = useSelector((state) => state.user)
  return (
    <div className='m-8 mt-2 h-3/5 bg-orange-200'>
        <div className='flex flex-row p-2'>
            <div className='w-[20%] my-auto ml-2'>
                <UserImage image={user.avatar} firstName={user.firstName} />
            </div>
            <div className='w-[74%] h-full mx-1'>
                <h3 className='flex flex-row text-2xl'>{user.firstName} {user.lastName}<VerifiedIcon className='mt-1'/></h3>
                <p className='flex flex-col'>{user.followers.length} Followers</p>
            </div>
            <div className='w-[20%]'>
                <span className='w-full h-full mx-auto my-auto'>
                    <Modal />
                </span>
            </div>
        </div>
        <Divider variant="middle" className='dark:bg-gray-800'/>
        <div className='py-3 px-3'>
            <div className='flex pb-3'>
                <LocationOnIcon/><p className='pl-2 block'>{user.location}</p>
            </div>
            <div className='flex'>
                <WorkIcon /><p className='pl-2'>{user.occupation}</p>
            </div>
        </div>
        <Divider variant="middle" className='dark:bg-gray-800'/>
        <div className='pl-3 py-2'>
            <div className='flex pb-3'>
                <PeopleIcon/><p className='pl-2 block'>Following: {user.following.length}</p>
            </div>
            <div className='flex'>
                <VisibilityIcon /><p className='pl-2'>Viewed Profiles: {user.viewedProfiles}</p>
            </div>
        </div>
    </div>
  )
}

export default UserInfo