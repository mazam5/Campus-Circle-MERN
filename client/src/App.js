import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react"
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Chat from "./components/Chat/Chat";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Actions/User";
import Register from "./components/Register/Register";


function App() {
  axios.defaults.baseURL = "http://localhost:8800/api/";
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, [dispatch]);

  const {isAuthenticated} = useSelector((state) => state.user)
  return (
  <BrowserRouter>
    <div >
          {isAuthenticated && <Navbar/>}
        <div className="relative h-[90vh]">
          <Routes>
            <Route exact path="/" element={isAuthenticated ? <Home/> : <Login/>}/>
            <Route path='/blog' element={isAuthenticated ? <Blog/> :  <Login/>}/>
            <Route path='/chat' element={isAuthenticated ? <Chat/>:  <Login/>}/>
            <Route path='/notification' element={isAuthenticated ? <Notification/>: <Login/>}/>
            <Route path='/login' element = {isAuthenticated ? <Home/> : <Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </div>
    </div>
  </BrowserRouter>
);
}

export default App;
