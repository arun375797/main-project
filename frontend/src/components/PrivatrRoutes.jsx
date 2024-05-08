import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const PrivatrRoutes = () => {
    const accessToken=sessionStorage.getItem('userToken');
    let validUser = false
    if(accessToken){
     validUser = true
    }
  return (
    validUser?<Outlet/>:<Navigate to ="/"/>
  )
}

export default PrivatrRoutes