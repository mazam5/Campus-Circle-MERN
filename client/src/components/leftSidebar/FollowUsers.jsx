import React,{useEffect} from 'react'
import Profile from '../../assets/profile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, getFriends, toFollow } from '../../Actions/User'
import axios from 'axios'
import { Button } from '@mui/material'

const FollowUsers = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(toFollow())
    },[dispatch])
    
    const followUnfollowUser = async(key) => {
        const {data} = await axios.put(`/users/${key}`)
        console.log(data)
        dispatch(getFriends());
        dispatch(toFollow(key))
        dispatch(LoadUser())
    }
    const {followList} = useSelector((state)=> state.user)
  return (
    <div className='m-8 h-1/3 bg-orange-200'>
        <p className='text-2xl '>Pending Requests</p>
        {followList && followList.map((f) => (
            <div className='flex flex-row p-3' key={f._id}>
                <div className='w-[20%]'>
                    <img className='rounded-[100%]' src={Profile} width={70} height={70} alt="profile" />
                </div>
                <div className='w-[60%] h-full mx-4'>
                    <h3 className='flex flex-col text-2xl'>{f.firstName} {f.lastName}</h3>
                </div>
                <div className='w-[20%]'>
                    <Button size="small" variant="contained" className='p-0 w-full h-full mx-auto my-auto' onClick={()=> followUnfollowUser(f._id)}>
                        follow 
                    </Button>
                </div>
            </div>
        ))} 
    </div>
  )
}

export default FollowUsers