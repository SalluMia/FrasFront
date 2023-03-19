import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link, useNavigate,Navigate } from 'react-router-dom'


const PrivatePage=()=> {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authToken');
    const isLoggedIn = authToken !== null;

       if (isLoggedIn){
         return <Outlet />
       }else{
         return <Navigate to={"/login" }/>;
          
       }
  

}

export default PrivatePage
