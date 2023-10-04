import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react"
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Search from "./components/Blog/Pages/Search";
import Chat from "./components/Chat/Chat";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Actions/User";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import { clearState } from "./Actions/Post";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import UserProfile from "./components/UserProfile/UserProfile";
import Loader from "./components/Loader/Loader";
import Write from "./components/Blog/Home/Write";
import SingleBlog from "./components/Blog/Home/SingleBlog";
import Suggestions from "./components/Blog/Pages/Suggestions";
import ExploreCategory from "./components/Blog/Pages/ExploreCategory";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState('light');
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

  const darkTheme = createTheme({
    palette:{
      mode: mode
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
      {isAuthenticated !== undefined ? (
      <Box width={'100%'} bgcolor={"background.default"} color={"text.primary"} className='h-full'>

          {isAuthenticated && <Navbar mode={mode} setMode={setMode}/>}
          
          <Routes>
            <Route exact path="/" element={isAuthenticated ? <Home /> : <Login/>}/>
            <Route path='/blog' element={isAuthenticated ? <Blog/> :  <Login/>}/>
            <Route path='/chat' element={isAuthenticated ? <Chat/>:  <Login/>}/>
            <Route path='/login' element = {isAuthenticated ? <Home/> : <Login/>}/>
            <Route path='/account' element = {isAuthenticated ? <Account/> : <Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />}/>
            <Route path="/blog/write" element={isAuthenticated ? <Write /> : <Login />}/>
            <Route path="/blog/:id" element={isAuthenticated ? <SingleBlog /> : <Login />}/>
            <Route path="/blog/me/following/suggestions" element={isAuthenticated ? <Suggestions /> : <Login />}/>
            <Route path="/search" element={isAuthenticated ? <Search /> : <Login />}></Route>
            <Route path="/categories" element={isAuthenticated ? <ExploreCategory /> : <Login />}></Route>
          </Routes>
        </Box>
    ):(
      <Loader />
    )}
  </BrowserRouter>
  </ThemeProvider>
);
}

export default App;
