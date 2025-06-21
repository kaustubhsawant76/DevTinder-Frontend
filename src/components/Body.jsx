import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import {BASE_URL} from '../utils/constants.js';
import axios from 'axios';
import {addUser} from '../utils/userSlice.js'
import { useEffect } from 'react'

const Body = () => {
  const dispatch=useDispatch();
  const Navigate=useNavigate();
const userData=useSelector((store)=>store.user);

  const fetchUser=async ()=>{
    if(userData) return
    try {
      const res=await axios.get(BASE_URL + "/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401){
      Navigate("/login")
      }
      console.error(error);
    }
  };

  useEffect(()=>{
fetchUser();
  },[]);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body