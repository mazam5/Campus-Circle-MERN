import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import {  Link } from 'react-router-dom'
import { LoginUser } from '../Actions/User'

const Login = () => {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleSubmit =(e)=> {
        e.preventDefault()
        dispatch(LoginUser(email, password));
    }
  return (
    <div className='h-screen bg-slate-200 flex items-center'>
    <form className='w-64 mx-auto' onSubmit={handleSubmit} action="">
      <p className='text-2xl font-bold mx-auto'>Login</p>
      <input type="email" className='block w-full p-3 mt-3 rounded-md border outline-none' required value={email} autoComplete="current-password" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'/>
      <input type="password" className='block w-full p-3 mt-3 rounded-md border outline-none' required value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password'/>
      <button className='bg-blue-500 w-full p-3 rounded-md mt-3' type='submit'>Login</button>
      <span className='pt-3 flex'>
        <h4 className='px-3'>Don't have an account? </h4>
        <Link to='/register'>Sign up</Link>
      </span>
    </form>
</div>
  );
}

export default Login