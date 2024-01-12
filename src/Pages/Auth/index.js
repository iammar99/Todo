import React from 'react'
import { Route , Routes } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Home from './Home'
import Verify from './Verify'
export default function Auth() {
  return (
    <>
    <Routes>
         <Route path="/" element={<Home />} /> 
         <Route path="/login" element={<Login />} /> 
         <Route path="/register" element={<Register />} /> 
         <Route path="/verfiy" element={<Verify />} /> 
    </Routes>
    </>
  )
}
