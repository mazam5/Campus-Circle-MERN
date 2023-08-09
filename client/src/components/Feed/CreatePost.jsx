import React from 'react'
import { Divider } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DuoIcon from '@mui/icons-material/Duo';
import ArticleIcon from '@mui/icons-material/Article';
import { useSelector } from 'react-redux';

const CreatePost = () => {
  const {user} = useSelector((state)=> state.user)
  return (
    <div className='mt-2 mb-3 w-full h-1/5 bg-slate-200'>
      <div className='p-3 h-[60%] flex'>
        <div className='w-[10%] my-auto'>
                <img className='rounded-[100%]' src={`http://localhost:8800/assets/${user.avatar}`} width={50} alt="profile" />
        </div>
        <div className='w-full my-auto'>
          <textarea type="text" placeholder="What's on you mind?" className=' px-3 my-auto outline-none rounded-full w-full'/>
        </div>
      </div>
      <Divider variant="middle" className='dark:bg-gray-800'/>
      <div className='flex h-[40%] px-24 items-center justify-between'>
        <button><AddAPhotoIcon/>Photo</button>
        <button><DuoIcon/>Video</button>
        <button><ArticleIcon/>Blog</button>
      </div>
    </div>
  )
}

export default CreatePost