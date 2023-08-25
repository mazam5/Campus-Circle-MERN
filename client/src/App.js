import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react"
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Home/Blog";
import Chat from "./components/Chat/Chat";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Actions/User";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import { clearState } from "./Actions/Post";
import { Box } from "@mui/material";
import UserProfile from "./components/UserProfile/UserProfile";
import Loader from "./components/Loader/Loader";

function App() {
  axios.defaults.baseURL = "http://localhost:8800/api/";
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.user)
  useEffect(() => {
    if(isAuthenticated===false) {
      dispatch(clearState())
    }
    else{
      dispatch(LoadUser());
    }
  },[isAuthenticated, dispatch]);

  return (
  <BrowserRouter>
      {isAuthenticated !== undefined ? (
    <Box width={'100%'} className='h-full'>

          {isAuthenticated && <Navbar/>}
          
          <Routes>
            <Route exact path="/" element={isAuthenticated ? <Home /> : <Login/>}/>
            <Route path='/blog' element={isAuthenticated ? <Blog/> :  <Login/>}/>
            <Route path='/chat' element={isAuthenticated ? <Chat/>:  <Login/>}/>
            <Route path='/notification' element={isAuthenticated ? <Notification/>: <Login/>}/>
            <Route path='/login' element = {isAuthenticated ? <Home/> : <Login/>}/>
            <Route path='/account' element = {isAuthenticated ? <Account/> : <Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />}/>
          </Routes>
        </Box>
    ):(
      <Loader />
    )}
  </BrowserRouter>
);
}

export default App;
