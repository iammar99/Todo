import React from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'

import Frontend from './Frontend/index'
import Auth from './Auth/index'
import Dashboard from './Dashboard/index'
import PrivateRoute from './PrivateRoute'
import { useAuthContext } from '../Contexts/AuthContext'


export default function Index() {
  const {isAuth} = useAuthContext()
  // console.log(isAuth)
  return (
    <>
    <Routes>
        <Route path='/*' element={!isAuth? <Auth /> :<Navigate to={"/dashboard"} /> } />
        <Route path='/frontend/*' element={<PrivateRoute Component={Frontend}/>} />
        <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard}/>} />

        {/* <Route path='*' element={<main><h1 className='text-center text-light'>404 Error Page Not Found</h1></main>}/> */}
    </Routes>
    </>
  )
}
