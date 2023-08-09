import React, {useEffect} from 'react'
import Profile from '../../assets/profile.jpg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getFriends } from '../../Actions/User'


const Friend = () => {

    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFriends());
  },[dispatch])

  const {friend} = useSelector((state)=> state.user)
  return (
    
    <div className='m-8 h-1/3 bg-orange-200'>
        <p className='text-2xl '>Friends</p>
        {friend && friend.map((f)=> (
            <div className='flex flex-row p-3' key={f._id}>
                <div className='w-[20%]'>
                    <img className='rounded-[100%]' src={Profile} width={40} height={70} alt="profile" />
                </div>
                <div className='w-[60%] h-full'>
                    <h3 className='flex flex-col my-auto text-lg'>{f.firstName} {f.lastName}</h3>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Friend
//   <div className='flex flex-row p-3'>
//       <div className='w-[20%]'>
//           <img className='rounded-[100%]' src={Profile} width={40} height={70} alt="profile" />
//       </div>
//       <div className='w-[60%] h-full'>
//           <h3 className='flex flex-col my-auto text-lg'>vallabh</h3>
//       </div>
//   </div>
//   <div className='flex flex-row p-3'>
//       <div className='w-[20%]'>
//           <img className='rounded-[100%]' src={Profile} width={40} height={70} alt="profile" />
//       </div>
//       <div className='w-[60%] h-full'>
//           <h3 className='flex flex-col my-auto text-lg'>vallabh</h3>
//       </div> 
//   </div> 