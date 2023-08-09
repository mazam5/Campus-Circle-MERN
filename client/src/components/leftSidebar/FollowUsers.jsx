import React, { useEffect } from 'react'
import Profile from '../../assets/profile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { toFollow } from '../../Actions/User'

const FollowUsers = () => {

    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(toFollow())
    },[dispatch])

    const {followList} = useSelector((state)=> state.user)
  return (
    <div className='m-8 h-1/3 bg-orange-200'>
        <p className='text-2xl '>Follow</p>
        {followList && followList.map((f) => (
            <div className='flex flex-row p-2' key={f._id}>
                <div className='w-[20%]'>
                    <img className='rounded-[100%]' src={Profile} width={70} height={70} alt="profile" />
                </div>
                <div className='w-[60%] h-full mx-4'>
                    <h3 className='flex flex-col text-2xl'>{f.firstName} {f.lastName}</h3>
                </div>
                <div className='w-[20%]'>
                    <button className='w-full h-full mx-auto my-auto'>
                        follow
                    </button>
                </div>
            </div>
        ))} 
    </div>
  )
}

export default FollowUsers