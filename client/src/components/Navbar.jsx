import React from 'react'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { Logout } from '../Actions/User';

function Navbar() {
  const dispatch = useDispatch();

  const handleClick = async() => {
    dispatch(Logout())
  }
  return (
    <>
  <div className='z-10 flex w-full p-5 px-10 justify-between bg-orange-300'>
    <div className='w-[10%]'>
      <h3>k-connect</h3>
    </div>
    <div className='w-[40%]'>
      <ul className='flex justify-between'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/notification">Notification</Link>
          </li>
          <li>
            <button className='' onClick={handleClick}><LogoutIcon/>Logout</button>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar