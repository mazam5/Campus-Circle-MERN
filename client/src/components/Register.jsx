import React, {useEffect, useState} from 'react'
// import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterUser } from '../Actions/User'
import { Link } from 'react-router-dom'
// import Login from './Login'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImage] = useState("")
  
    const dispatch = useDispatch()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        if(image) {
          formData.append('picture', image);
          formData.append('avatar', image.name)
        }
        dispatch(RegisterUser(formData));
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    }
    const {isRegistered} = useSelector((state)=>state.user)
    useEffect(() => {
      if(isRegistered) {
        window.location.href = '/login';
      }
    },[isRegistered])


  return (
    <div className='h-screen bg-slate-200 flex items-center'>
        <form className='w-[50%] mx-auto mb-12 p-8 bg-white' onSubmit={handleSubmit} action="">
            <h1 className='text-4xl text-center mb-3'>Register</h1>
            <div className="flex ">
                <input type="file" accept="image/*" className='mx-auto mt-3' onChange={handleImageChange} />
              </div>
            <input type="text" required className='block w-[70%] mx-auto  p-3 mt-3 rounded-full border outline-none' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter your First Name'/>
            <input type="text" required className='block w-[70%] mx-auto p-3 mt-3 rounded-full border outline-none' value = {lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter your Last Name'/>
            <input type="email" required className='block w-[70%] mx-auto p-3 mt-3 rounded-full border outline-none' value={email} autoComplete="current-password" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
            <input type="password" required className='block w-[70%] mx-auto p-3 mt-3 rounded-full border outline-none' value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password'/>
            <div className='w-full ml-[25%]'>
              <button className='bg-blue-500 w-[50%] mx-auto p-3 rounded-full mt-3' type='submit'>Register</button>
            </div>
            <span className=' w-full pt-3 flex'>
              <div className='mx-auto flex'>
                <h4 className='px-2'>Already have an account? </h4>
                <Link to='/login' >Login up</Link>
              </div>
            </span>
        </form>
    </div>
  )
}

export default Register